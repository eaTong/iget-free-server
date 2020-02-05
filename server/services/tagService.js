/**
 * Created by eaTong on 2020-02-05 .
 * Description: auto generated in  2020-02-05
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Tag = require('../models/Tag');

module.exports = {
  addTag: async (tag, loginUser) => {
    tag.enable = true;
    tag.userId = loginUser.id;

    return Tag.create(tag);
  },

  updateTags: async (tag, loginUser) => {
    return Tag.update(tag, {where: {id: tag.id, userId: loginUser.id}})
  },

  deleteTags: async (ids, loginUser) => {
    return Tag.update({enable: false}, {where: {id: {[Op.in]: ids}, userId: loginUser.id}});
  },

  getTags: async ({pageIndex = 0, pageSize = 20, keywords = ''}, loginUser) => {
    const option = {where: {enable: true, name: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await Tag.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Tag.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getTagDetail: async ({id}, loginUser) => {
    return Tag.findOne({where: {id, userId: loginUser.id}});
  }
};
