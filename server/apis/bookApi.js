/**
 * Created by eaTong on 2019-11-20 .
 * Description: auto generated in  2019-11-20
 */

const {LogicError} = require("../framework/errors");
const bookService = require('../services/bookService');

module.exports = {
  addBook: async (ctx) => {
    return bookService.addBook(ctx.request.body);
  },
  searchBook: async (ctx) => {
    return bookService.searchBook(ctx.request.body);
  },
  updateBooks: async (ctx) => {
    return bookService.updateBooks(ctx.request.body);
  },
  deleteBooks: async (ctx) => {
    return bookService.deleteBooks(ctx.request.body.ids);
  },
  getBooks: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return bookService.getBooks(ctx.request.body, loginUser);
  },
  getBookDetail: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return bookService.getBookDetail(ctx.request.body, loginUser);
  }
};
