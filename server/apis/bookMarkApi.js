/**
 * Created by eaTong on 2019-11-21 .
 * Description: auto generated in  2019-11-21
 */

const {LogicError} = require("../framework/errors");
const bookMarkService = require('../services/bookMarkService');

module.exports = {
  addBookMark: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookMarkService.addBookMark(ctx.request.body, loginUser);
  },
  markBook: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookMarkService.markBook(ctx.request.body, loginUser);
  },
  rate: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookMarkService.rate(ctx.request.body, loginUser);
  },
  updateBookMarks: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookMarkService.updateBookMarks(ctx.request.body, loginUser);
  },
  deleteBookMarks: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookMarkService.deleteBookMarks(ctx.request.body.ids, loginUser);
  },
  getBookMarks: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookMarkService.getBookMarks(ctx.request.body, loginUser);
  },
  getBookMarksStatics: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookMarkService.getBookMarksStatics(loginUser);
  },
  getBookMarkDetail: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookMarkService.getBookMarkDetail(ctx.request.body, loginUser);
  }
};
