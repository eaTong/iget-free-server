/**
 * Created by eaTong on 2020-02-05 .
 * Description: auto generated in  2020-02-05
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Tag = require('../models/Tag');
const Contact = require('../models/Contact');
const ContactTag = require('../models/ContactTag');

module.exports = {
  addTag: async (tag, loginUser) => {
    tag.enable = true;
    tag.userId = loginUser.id;
    const namePinYin = pinyin(tag.name, {style: pinyin.STYLE_NORMAL});
    tag.pinYin = namePinYin.map(str => (str[0] || '')[0]).join('');
    tag.fullPinYin = namePinYin.map(str => (str[0] || '')).join('');
    return Tag.create(tag);
  },

  updateTags: async (tag, loginUser) => {
    const namePinYin = pinyin(tag.name, {style: pinyin.STYLE_NORMAL});
    tag.pinYin = namePinYin.map(str => (str[0] || '')[0]).join('');
    tag.fullPinYin = namePinYin.map(str => (str[0] || '')).join('');
    return Tag.update(tag, {where: {id: tag.id, userId: loginUser.id}})
  },

  deleteTags: async (ids, loginUser) => {
    return Tag.update({enable: false}, {where: {id: {[Op.in]: ids}, userId: loginUser.id}});
  },
  getMyTags: async ({statics}, loginUser) => {
    const contactIds = await Contact.findAll({
      raw: true,
      where: {userId: loginUser.id, enable: true},
      attributes: ['id']
    });
    const tagIds = await ContactTag.findAll({
      raw: true,
      where: {contactId: {[Op.in]: contactIds.map(item => item.id)}}
    });
    const myTags = await Tag.findAll({
      raw: true,
      where: {id: {[Op.in]: tagIds.map(item => item.tagId)}}
    });
    if (statics) {
      const countStatics = await ContactTag.findAll({
        raw: true,
        group: 'tagId',
        attributes: ['tagId', [sequelize.fn('COUNT', '*'), 'total']],
        where: {contactId: {[Op.in]: contactIds.map(item => item.id)}},
        order: [['tagId', 'desc']]
      });
      const countMapping = {};
      for (const count of countStatics) {
        countMapping[count.tagId + ''] = count.total;
      }
      return myTags.map(tag => ({...tag, total: countMapping[tag.id + '']})).sort((a, b) => b.total - a.total)
    }
    return myTags;
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
  getTagsByIds: async ({ids}) => {
    return Tag.findAll({where: {id: {[Op.in]: ids}}})
  },
  getTagDetail: async ({id}, loginUser) => {
    return Tag.findOne({where: {id, userId: loginUser.id}});
  }
};
