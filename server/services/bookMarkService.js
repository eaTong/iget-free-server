/**
 * Created by eaTong on 2019-11-21 .
 * Description: auto generated in  2019-11-21
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BookMark = require('../models/BookMark');
const Book = require('../models/Book');
const RateHistory = require('../models/RateHistory');

module.exports = {

  addBookMark: async (bookMark, loginUser) => {
    bookMark.enable = true;
    bookMark.userId = loginUser.id;
    return await BookMark.create(bookMark);
  },
  markBook: async (data, loginUser) => {
    const mark = await BookMark.findOne({where: {bookId: data.bookId, userId: loginUser.id}});
    if (mark) {
      mark.status = data.status;
      mark.finishTime = data.finishTime;
      await mark.save();
      return {isNew: false};
    }
    const bookMark = {
      enable: true,
      userId: loginUser.id,
      ...data,
    };
    await BookMark.create(bookMark);
    return {isNew: true};
  },

  rate: async (rate, loginUser) => {
    await RateHistory.create({...rate, userId: loginUser.id});
    return await BookMark.update(rate, {where: {bookId: rate.bookId, userId: loginUser.id}})
  },

  updateBookMarks: async (bookMark, loginUser) => {
    return await BookMark.update(bookMark, {where: {id: bookMark.id, userId: loginUser.id}})
  },

  deleteBookMarks: async (ids, loginUser) => {
    return await BookMark.update({enable: false}, {where: {id: {[Op.in]: ids, userId: loginUser.id}}});
  },

  getBookMarks: async ({pageIndex = 0, pageSize = 20, keywords = '', status}, loginUser) => {
    const option = {where: {enable: true, userId: loginUser.id}};
    if (typeof status && status !== -1) {
      option.where.status = status;
    }
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
