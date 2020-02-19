/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */
const pinyin = require("pinyin");
const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Contact = require('../models/Contact');
const ContactTag = require('../models/ContactTag');
const Tag = require('../models/Tag');
const ContactRecord = require('../models/ContactRecord');
const Relation = require('../models/Relation');
const ContactRelation = require('../models/ContactRelation');

async function resolveTags(tags) {
  const tempTags = tags.filter(tag => /^temp~/.test(tag)).map(tag => tag.replace(/^temp~/, ''));
  const savedTags = await Tag.findAll({where: {enable: true, name: {[Op.in]: tempTags}}});
  const unsavedTags = tempTags.filter(tag => !savedTags.find(savedTag => savedTag.dataValues.name === tag)).map(tag => {
    const tagPinyin = pinyin(tag, {style: pinyin.STYLE_NORMAL});
    return {
      name: tag,
      enable: 1,
      pinYin: tagPinyin.map(str => (str[0] || '')[0]).join(''),
      fullPinYin: tagPinyin.map(str => (str[0] || '')).join('')
    }
  });
  const result = await Tag.bulkCreate(unsavedTags);
  return [...tags.filter(tag => !/^temp~/.test(tag)), ...[...result, ...savedTags].map(item => item.dataValues.id)];
}

module.exports = {
  addContact: async (contact, loginUser) => {
    contact.enable = true;
    contact.userId = loginUser.id;
    const namePinYin = pinyin(contact.name, {style: pinyin.STYLE_NORMAL});
    contact.pinYin = namePinYin.map(str => (str[0] || '')[0]).join('');
    contact.fullPinYin = namePinYin.map(str => (str[0] || '')).join('');
    const savedContract = await Contact.create(contact);
    if (contact.tags) {
      await savedContract.setTags(await resolveTags(contact.tags))
    }
    return savedContract;

  },


  updateContacts: async (contact, loginUser) => {
    const namePinYin = pinyin(contact.name, {style: pinyin.STYLE_NORMAL});
    contact.pinYin = namePinYin.map(str => (str[0] || '')[0]).join('');
    contact.fullPinYin = namePinYin.map(str => (str[0] || '')).join('');
    if (contact.tags) {
      const savedContract = await Contact.findOne({where: {id: contact.id}});
      await savedContract.setTags(await resolveTags(contact.tags))
    }
    return Contact.update(contact, {where: {id: contact.id, userId: loginUser.id}})
  },

  deleteContacts: async (ids, loginUser) => {
    return Contact.update({enable: false}, {where: {id: {[Op.in]: ids}, userId: loginUser.id}});
  },

  getContacts: async ({pageIndex = 0, pageSize = 20, keywords = '', tagId, tagIds}, loginUser) => {

    const option = {
      include: [{model: Tag}],
      where: {
        enable: true, userId: loginUser.id,
        [Op.or]: [
          {name: {[Op.like]: `%${keywords}%`}},
          {pinYin: {[Op.like]: `%${keywords}%`}},
          {fullPinYin: {[Op.like]: `%${keywords}%`}},
        ]
      }
    };
    if (tagId && tagId !== '0') {
      const contractIds = await ContactTag.findAll({
        attributes: ['contactId'],
        where: {tagId}
      });
      option.where.id = {[Op.in]: contractIds.map(item => item.contactId)};
    }
    if (tagIds && tagIds.length > 0) {
      const contractIds = await ContactTag.findAll({
        attributes: ['contactId'],
        where: {tagId: {[Op.in]: tagIds}}
      });
      option.where.id = {[Op.in]: contractIds.map(item => item.contactId)};
    }
    const {dataValues: {total}} = await Contact.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Contact.findAll({
      offset: pageIndex * pageSize,
      limit: parseInt(pageSize),
      ...option,
    });
    return {total, list}
  },

  getContactDetail: async ({id}, loginUser) => {
    const contact = await Contact.findOne({
      where: {id, userId: loginUser.id},
      include: [
        {model: Tag}, {model: ContactRecord},
      ]
    });
    const fromRelations = await ContactRelation.findAll({
      where: {contactFromId: id},
      include: [{model: Relation, as: 'relation'}, {model: Contact, as: 'contactTo'}]
    });
    const toRelations = await ContactRelation.findAll({
      where: {contactToId: id},
      include: [{model: Relation, as: 'relation'}, {model: Contact, as: 'contactFrom'}]
    });
    return {...contact.dataValues, fromRelations, toRelations};
  },

  addRecord: async (record, loginUser) => {
    record.userId = loginUser.id;
    return ContactRecord.create(record);
  },

  addRelation: async (data, loginUser) => {
    let relation;
    if (/temp~/.test(data.relation)) {
      const relationName = data.relation.replace(/temp~/, '');
      const namePinYin = pinyin(relationName, {style: pinyin.STYLE_NORMAL});
      relation = await Relation.findOne({where: {name: relationName}});
      if (!relation) {
        relation = await Relation.create({
          name: relationName,
          pinYin: namePinYin.map(str => (str[0] || '')[0]).join(''),
          fullPinYin: namePinYin.map(str => (str[0] || '')).join('')
        });
      }

    } else {
      relation = await Relation.findOne({where: {id: data.relation}})
    }
    await ContactRelation.create({...data, relationId: relation.dataValues.id});
    return relation;
  }
};
