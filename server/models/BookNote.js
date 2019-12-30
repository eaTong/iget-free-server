/**
 * Created by eaTong on 2019-11-23 .
 * Description: auto generated in  2019-11-23
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const User = require('./User');
const Book = require('./Book');

const BookNote = sequelize.define('bookNote', {
  content: {type: Sequelize.TEXT},
  images: {type: Sequelize.JSON},
  reference: {type: Sequelize.TEXT},
  enable: Sequelize.BOOLEAN,
});

BookNote.belongsTo(User);
User.hasMany(BookNote);
BookNote.belongsTo(Book);
Book.hasMany(BookNote);

module.exports = BookNote;
