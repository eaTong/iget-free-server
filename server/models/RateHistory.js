/**
 * Created by eaTong on 2019-11-22 .
 * Description:
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const User = require('./User');
const Book = require('./Book');

const RateHistory = sequelize.define('rateHistory', {
  rate: {type: Sequelize.INTEGER},
  reason: {type: Sequelize.STRING, comment: '评分理由'},
});

RateHistory.belongsTo(User);
User.hasMany(RateHistory);
RateHistory.belongsTo(Book);
Book.hasMany(RateHistory);
module.exports = RateHistory;
