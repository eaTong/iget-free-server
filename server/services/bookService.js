
/**
 * Created by eaTong on 2019-11-20 .
 * Description: auto generated in  2019-11-20
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Book = require('../models/Book');

module.exports = {

  addBook: async (book) => {
    book.logo = JSON.stringify(book.logo || []);
    book.enable = true;
    return await Book.create(book);
  },

  updateBooks: async (book) => {
    return await Book.update(book, {where: {id: book.id}})
  },

  deleteBooks: async (ids) => {
    return await Book.update({enable: false}, {where: {id: {[Op.in]: ids}}});
  },

  getBooks: async ({pageIndex = 0, pageSize = 20, keywords = ''}) => {
    const option = {where: {enable: true, name: {[Op.like]: `%${keywords}%`}}}; 
    const {dataValues: {total}} = await Book.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Book.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getBookDetail: async ({id}) => {
    return await Book.findOne({where: {id}});
  }
}; 
  