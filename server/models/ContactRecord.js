const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Contact = require('./Contact');


const ContactRecord = sequelize.define('contactRecord', {
  userId: {type: Sequelize.INTEGER, comments: '操作人'},
  content: {type: Sequelize.STRING, length: 5000, comments: '记录正文'},
  images: {type: Sequelize.JSON, comments: '记录图片'}
});


module.exports = ContactRecord;
