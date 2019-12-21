/**
 * Created by eaTong on 2019-11-21 .
 * Description: auto generated in  2019-11-21
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const User = require('./User');
const Book = require('./Book');

const BookMark = sequelize.define('bookMark', {
  status: {type: Sequelize.INTEGER, comment: '0：未读，1：想读，2：在读，3：已读完'},
  listenedStatus: {type: Sequelize.INTEGER, comment: '0：未听，1：已听'},
  rate: {type: Sequelize.INTEGER, comment: '评分'},
  finishTime: {type: Sequelize.DATE, comment: '读完日期'},
  enable: Sequelize.BOOLEAN,
});

BookMark.belongsTo(User);
User.hasMany(BookMark);
BookMark.belongsTo(Book);
Book.hasMany(BookMark);
module.exports = BookMark;
