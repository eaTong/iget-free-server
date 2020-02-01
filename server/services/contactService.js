
/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Contact = require('../models/Contact');

module.exports = {
  addContact: async (contact,loginUser) => {
    contact.enable = true;
    contact.userId = loginUser.id;

    return Contact.create(contact);
  },

  updateContacts: async (contact,loginUser) => {
    return Contact.update(contact, {where: {id: contact.id,userId:loginUser.id}})
  },

  deleteContacts: async (ids,loginUser) => {
    return Contact.update({enable: false}, {where: {id: {[Op.in]: ids},userId:loginUser.id}});
  },

  getContacts: async ({pageIndex = 0, pageSize = 20, keywords = ''},loginUser) => {
    const option = {where: {enable: true,userId:loginUser.id, name: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await Contact.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Contact.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getContactDetail: async ({id},loginUser) => {
    return Contact.findOne({where: {id,userId:loginUser.id}});
  }
};
  