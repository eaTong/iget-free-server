/**
 * Created by eaTong on 2019-11-20 .
 * Description: auto generated in  2019-11-20
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Book = require('../models/Book');
const BookMark = require('../models/BookMark');
const RateHistory = require('../models/RateHistory');
const BookNote = require('../models/BookNote');
const {getBookByISDN} = require("../thirdParty/isbn");

module.exports = {
  addBook: async (book) => {
    book.enable = true;
    return await Book.create(book);
  },

  updateBooks: async (book) => {
    return await Book.update(book, {where: {id: book.id}})
  },

  searchBook: async ({keywords}) => {
    if (/^[0-9]{13}$/.test(keywords)) {
      const books = await Book.findAll({
        where: {
          enable: true, isbn13: {[Op.like]: `%${keywords}%`},
        },
        limit: 20
      });
      if (books.length > 0) {
        return books;
      }
      const book = await getBookByISDN(keywords);
      if (book) {
        const savedBook = await Book.create(book);
        return [savedBook.dataValues]
      }
      return []
    } else {
      return await Book.findAll({
        where: {
          enable: true, name: {[Op.like]: `%${keywords}%`},
        },
        limit: 20
      });
    }
  },

  deleteBooks: async (ids) => {
    return await Book.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },

  getBooks: async ({pageIndex = 0, pageSize = 20, keywords = ''}, loginUser) => {
    const option = {where: {enable: true, name: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await Book.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Book.findAll({
      offset: pageIndex * pageSize,
      limit: pageSize, ...option,
      order: [['createdAt', 'desc']],
      include: {model: BookMark, required: false, where: {userId: loginUser.id, enable: true}}
    });
    return {total, list}
  },

  getBookDetail: async ({id}, loginUser) => {
    const book = await Book.findOne({
      where: {id},
      include: [
        {model: RateHistory, required: false, order: [['createdAt', 'desc']]},
        {model: BookNote, required: false, order: [['createdAt', 'desc']], where: {enable: true}}]
    });
    const mark = await BookMark.findOne({where: {bookId: id, userId: loginUser.id}});
    return {...book.dataValues, mark: mark.dataValues};
  }
};
