/**
 * Created by eaTong on 2019-11-23 .
 * Description: auto generated in  2019-11-23
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const BookNote = require('../models/BookNote');
const Book = require('../models/Book');

module.exports = {
  addBookNote: async (bookNote, loginUser) => {
    bookNote.enable = true;
    bookNote.userId = loginUser.id;
    return BookNote.create(bookNote);
  },

  updateBookNotes: async (bookNote, loginUser) => {
    return BookNote.update(bookNote, {where: {id: bookNote.id, userId: loginUser.id}})
  },

  deleteBookNotes: async (ids, loginUser) => {
    return BookNote.update({enable: false}, {where: {id: {[Op.in]: ids}, userId: loginUser.id}});
  },

  getBookNotes: async ({pageIndex = 0, pageSize = 20, keywords = ''}, loginUser) => {
    const option = {
      where: {
        [Op.and]: [
          {
            enable: true,
            userId: loginUser.id
          },
          {
            [Op.or]: [
              {content: {[Op.like]: `%${keywords}%`}},
              {reference: {[Op.like]: `%${keywords}%`}},
            ]
          }
        ]
      }
    };
    const {dataValues: {total}} = await BookNote.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await BookNote.findAll({
      offset: pageIndex * pageSize,
      limit: pageSize, ...option,
      include: [{model: Book}]
    });
    return {total, list}
  },

  getBookNoteDetail: async ({id}, loginUser) => {
    return BookNote.findOne({where: {id, userId: loginUser.id}});
  }
};
