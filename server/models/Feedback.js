/**
 * Created by eaTong on 2020-01-29 .
 * Description: auto generated in  2020-01-29
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const User = require('./User');

const Feedback = sequelize.define('feedback', {
  name: {type: Sequelize.STRING},
  description: {type: Sequelize.TEXT},
  images: {type: Sequelize.JSON},
  responseStatues: {type: Sequelize.INTEGER},
  userId: {type: Sequelize.INTEGER},
  responseText: {type: Sequelize.TEXT},
  enable: Sequelize.BOOLEAN,
});

Feedback.belongsTo(User, {foreignKey: 'userId'});
module.exports = Feedback;
