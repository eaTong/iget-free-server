const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const User = require('./User');
const Objective = require('./Objective');


const ObjectiveRecord = sequelize.define('objectiveRecord', {
  title: {type: Sequelize.STRING, comments: '记录标题'},
  operatorUserId: {type: Sequelize.INTEGER, comments: '操作人'},
  objectiveId: {type: Sequelize.UUID, comments: '关联计划ID'},
  content: {type: Sequelize.STRING, length: 5000, comments: '记录正文'},
  images: {type: Sequelize.JSON, comments: '记录图片'}
});

ObjectiveRecord.belongsTo(User, {foreignKey: 'operatorUserId', as: 'operator'});
ObjectiveRecord.belongsTo(Objective, {foreignKey: 'objectiveId', as: 'objective'});

module.exports = ObjectiveRecord;
