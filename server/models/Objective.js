
/**
 * Created by eaTong on 2020-01-10 .
 * Description: auto generated in  2020-01-10
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const User = require('./User');

const Objective = sequelize.define('objective', {
  name: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING, comment: '描述'},
  code: {type: Sequelize.STRING, comment: '任务编号'},
  planEndDate: {type: Sequelize.DATEONLY, comment: '计划结束日期'},
  level: {type: Sequelize.INTEGER, comment: '层级'},
  pictures: {type: Sequelize.JSON, comment: '图片'},

  responsibleUserId: {type: Sequelize.INTEGER,},
  publishUserId: {type: Sequelize.INTEGER,},

  enable: Sequelize.BOOLEAN,
});

Objective.belongsTo(User, {foreignKey: 'responsibleUserId', as: 'responsibleUser'});
Objective.belongsTo(User, {foreignKey: 'publishUserId', as: 'publishUser'});

module.exports = Objective;
