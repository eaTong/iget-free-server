/**
 * Created by eaTong on 2019-11-20 .
 * Description: auto generated in  2019-11-20
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Book = sequelize.define('book', {
  name: {type: Sequelize.STRING, comment: '书名'},
  subTitle: {type: Sequelize.STRING, comment: '副标题'},
  coverImage: {type: Sequelize.STRING, comment: '封面'},
  publishTime: {type: Sequelize.DATEONLY, comment: '出版日期'},
  author: {type: Sequelize.STRING, comment: '作者'},
  publisher: {type: Sequelize.STRING, comment: '出版方'},
  isbn10: {type: Sequelize.STRING, comment: '10位ISDN'},
  isbn13: {type: Sequelize.STRING, comment: '13位ISDN'},
  pages: {type: Sequelize.INTEGER, comment: '页数'},
  summary: {type: Sequelize.TEXT, comment: '摘要'},
  enable: Sequelize.BOOLEAN,
});

module.exports = Book;
