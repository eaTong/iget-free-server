/**
 * Created by eaTong on 2019-11-20 .
 * Description: auto generated in  2019-11-20
 */

const {LogicError} = require("../framework/errors");
const bookService = require('../services/bookService');

module.exports = {
  addBook: async (ctx) => {
    return await bookService.addBook(ctx.request.body);
  },
  updateBooks: async (ctx) => {
    return await bookService.updateBooks(ctx.request.body);
  },
  deleteBooks: async (ctx) => {
    return await bookService.deleteBooks(ctx.request.body.ids);
  },
  getBooks: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await bookService.getBooks(ctx.request.body, loginUser);
  },
  getBookDetail: async (ctx) => {
    return await bookService.getBookDetail(ctx.request.body);
  }
};
