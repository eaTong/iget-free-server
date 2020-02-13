
/**
 * Created by eaTong on 2020-02-13 .
 * Description: auto generated in  2020-02-13
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Relation = require('../models/Relation');

module.exports = {
  addRelation: async (relation,loginUser) => {
    return Relation.create(relation);
  },

  updateRelations: async (relation,loginUser) => {
    return Relation.update(relation, {where: {id: relation.id}})
  },

  deleteRelations: async (ids,loginUser) => {
    return Relation.update({where: {id: {[Op.in]: ids}}});
  },

  getRelations: async ({pageIndex = 0, pageSize = 20, keywords = ''},loginUser) => {
    const option = {where: { name: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await Relation.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Relation.findAll({offset: pageIndex * pageSize, limit: parseInt(pageSize), ...option});
    return {total, list}
  },

  getRelationDetail: async ({id},loginUser) => {
    return Relation.findOne({where: {id}});
  }
};
