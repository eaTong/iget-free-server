
/**
 * Created by eaTong on 2019-11-23 .
 * Description: auto generated in  2019-11-23
 */

const {LogicError} = require("../framework/errors");
const bookNoteService = require('../services/bookNoteService');

module.exports = {
  addBookNote: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookNoteService.addBookNote(ctx.request.body,loginUser);
  },
  updateBookNotes: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookNoteService.updateBookNotes(ctx.request.body,loginUser);
  },
  deleteBookNotes: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookNoteService.deleteBookNotes(ctx.request.body.ids,loginUser);
  },
  getBookNotes: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookNoteService.getBookNotes(ctx.request.body,loginUser);
  },
  getBookNoteDetail: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookNoteService.getBookNoteDetail(ctx.request.body,loginUser);
  }
};
  