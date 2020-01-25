/**
 * Created by eaTong on 2020-01-10 .
 * Description: auto generated in  2020-01-10
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const User = require('./User');
const Team = require('./Team');
const uuid = require('uuid/v4');

const Objective = sequelize.define('objective', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuid()
  },
  name: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING, comment: '描述'},
  code: {type: Sequelize.STRING, comment: '任务编号'},
  calendarId: {type: Sequelize.STRING, comment: '保存到手机唯一ID'},
  planEndDate: {type: Sequelize.DATEONLY, comment: '计划结束日期'},
  planStartDate: {type: Sequelize.DATEONLY, comment: '计划开始日期'},
  responsibleTeamId: {type: Sequelize.STRING, comment: '负责团队'},
  pictures: {type: Sequelize.JSON, comment: '图片'},
  selfUse: {type: Sequelize.BOOLEAN, comment: '是否个人使用'},
  reward: {type: Sequelize.STRING, comment: '达成奖励'},
  rewarded: {type: Sequelize.BOOLEAN, comment: '奖励是否发放'},
  responsibleUserId: {type: Sequelize.INTEGER, comment: '负责人'},
  publishUserId: {type: Sequelize.INTEGER, comment: '发布人'},
  parentObjectiveId: {type: Sequelize.UUID, comment: '上级计划ID'},
  progress: {type: Sequelize.INTEGER, comment: '完成进度', defaultValue: 0},
  enable: Sequelize.BOOLEAN,
});

Objective.belongsTo(User, {foreignKey: 'responsibleUserId', as: 'responsibleUser'});
Objective.belongsTo(User, {foreignKey: 'publishUserId', as: 'publishUser'});
Objective.belongsTo(Objective, {foreignKey: 'parentObjectiveId', as: 'parentObjective'});

module.exports = Objective;
