
/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

const {LogicError} = require("../framework/errors");
const contactService = require('../services/contactService');

module.exports = {
  addContact: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return contactService.addContact(ctx.request.body,loginUser);
  },
  updateContacts: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return contactService.updateContacts(ctx.request.body,loginUser);
  },
  deleteContacts: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return contactService.deleteContacts(ctx.request.body.ids,loginUser);
  },
  getContacts: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return contactService.getContacts(ctx.request.body,loginUser);
  },
  getContactDetail: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return contactService.getContactDetail(ctx.request.body,loginUser);
  }
};
  