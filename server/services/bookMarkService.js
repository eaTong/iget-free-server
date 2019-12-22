/**
 * Created by eaTong on 2019-11-21 .
 * Description: auto generated in  2019-11-21
 */

const { Op } = require('sequelize');
const moment = require('moment');
const sequelize = require('../framework/database');
const { LogicError } = require('../framework/errors');
const BookMark = require('../models/BookMark');
const Book = require('../models/Book');
const RateHistory = require('../models/RateHistory');

async function getBookCoverImages(userId, status) {
  const result = await BookMark.findAll({
    where: { enable: true, userId, status: status },
    attributes: [],
    limit: 3,
    order: [['updatedAt', 'desc']],
    include: [{ model: Book, attributes: ['coverImage'], where: { coverImage: { [Op.not]: null } } }]
  });
  return result.map(item => item.book.coverImage);
}

async function getListenedBookCoverImages(userId, listenedStatus) {
  const result = await BookMark.findAll({
    where: { enable: true, userId, listenedStatus },
    attributes: [],
    limit: 3,
    order: [['updatedAt', 'desc']],
    include: [{ model: Book, attributes: ['coverImage'], where: { coverImage: { [Op.not]: null } } }]
  });
  return result.map(item => item.book.coverImage);
}

module.exports = {

  addBookMark: async (bookMark, loginUser) => {
    bookMark.enable = true;
    bookMark.userId = loginUser.id;
    return await BookMark.create(bookMark);
  },
  markBook: async (data, loginUser) => {
    const mark = await BookMark.findOne({ where: { bookId: data.bookId, userId: loginUser.id } });
    if (mark) {
      mark.status = data.status;
      mark.listenedStatus = data.listenedStatus;
      mark.finishTime = (data.status === 3  && !data.finishTime) ? moment().format('YYYY-MM-DD HH:mm:SS') : data.finishTime;
      await mark.save();
      return { isNew: false };
    }
    const bookMark = {
      enable: true,
      userId: loginUser.id,
      ...data,
    };
    await BookMark.create(bookMark);
    return { isNew: true };
  },

  rate: async (rate, loginUser) => {
    await RateHistory.create({ ...rate, userId: loginUser.id });
    return await BookMark.update(rate, { where: { bookId: rate.bookId, userId: loginUser.id } })
  },

  updateBookMarks: async (bookMark, loginUser) => {
    return await BookMark.update(bookMark, { where: { id: bookMark.id, userId: loginUser.id } })
  },

  deleteBookMarks: async (ids, loginUser) => {
    return await BookMark.update({ enable: false }, { where: { id: { [Op.in]: ids, userId: loginUser.id } } });
  },

  getBookMarksStatics: async (loginUser) => {
    const userId = loginUser.id;
    // const unreadCoversPromise = getBookCoverImages(userId, 0);
    const wantedCoversPromise = getBookCoverImages(userId, 1);
    const readingCoversPromise = getBookCoverImages(userId, 2);
    const readCoversPromise = getBookCoverImages(userId, 3);
    const listenedCoversPromise = getListenedBookCoverImages(userId, 1);
    const covers = await Promise.all([wantedCoversPromise, readingCoversPromise, readCoversPromise, listenedCoversPromise]);
    const countInfo = await BookMark.findAll({
      where: { userId, enable: true },
      group: 'status',
      attributes: ['status', [sequelize.fn('COUNT', 'status'), 'total',]]
    });
    const count = [0, 0, 0, 0];
    countInfo.forEach(info => {
      const item = info.toJSON();
      count[item.status] = item.total;
    });
    const listenedCount = await BookMark.findOne({ where: { userId, enable: true, listenedStatus: 1 }, attributes: [[sequelize.fn('COUNT', '*'), 'total']] });
    return {
      wanted: { count: count[1], covers: covers[0] },
      reading: { count: count[2], covers: covers[1] },
      read: { count: count[3], covers: covers[2] },
      listened: { count: listenedCount.dataValues.total, covers: covers[3] },
    };
  },

  getBookMarks: async ({ pageIndex = 0, pageSize = 20, keywords = '', status, listenedCount ,order='createdAt'}, loginUser) => {
    const option = { where: { enable: true, userId: loginUser.id } };
    if (status > -1) {
      option.where.status = status;
    }
    if (listenedCount > -1) {
      option.where.listenedCount = listenedCount;
    }
    const { dataValues: { total } } = await BookMark.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await BookMark.findAll({
      offset: pageIndex * pageSize,
      limit: pageSize, ...option,
      include: [{ model: Book }],
      order:[[order,'desc']]
    });
    return { total, list }
  },

  getBookMarkDetail: async ({ id }, loginUser) => {
    return await BookMark.findOne({ where: { id, userId: loginUser.id } });
  }
};
