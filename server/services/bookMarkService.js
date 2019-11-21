/**
 * Created by eaTong on 2019-11-21 .
 * Description: auto generated in  2019-11-21
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BookMark = require('../models/BookMark');
const Book = require('../models/Book');

module.exports = {

  addBookMark: async (bookMark, loginUser) => {
    bookMark.enable = true;
    bookMark.userId = loginUser.id;
    return await BookMark.create(bookMark);
  },

  updateBookMarks: async (bookMark, loginUser) => {
    return await BookMark.update(bookMark, {where: {id: bookMark.id, userId: loginUser.id}})
  },

  deleteBookMarks: async (ids, loginUser) => {
    return await BookMark.update({enable: false}, {where: {id: {[Op.in]: ids, userId: loginUser.id}}});
  },

  getBookMarks: async ({pageIndex = 0, pageSize = 20, keywords = ''}, loginUser) => {
    const option = {where: {enable: true, userId: loginUser.id}};
    const {dataValues: {total}} = await BookMark.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await BookMark.findAll({
      offset: pageIndex * pageSize,
      limit: pageSize, ...option,
      include: [{model: Book}]
    });
    return {total, list}
  },

  getBookMarkDetail: async ({id}, loginUser) => {
    return await BookMark.findOne({where: {id, userId: loginUser.id}});
  }
};
