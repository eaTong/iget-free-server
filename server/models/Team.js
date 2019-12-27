/**
 * Created by eaTong on 2019-12-27 .
 * Description: auto generated in  2019-12-27
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const TeamUser = require('./TeamUser');
const User = require('./User');

const Team = sequelize.define('team', {
  name: {type: Sequelize.STRING, comments: '团队名称'},
  description: {type: Sequelize.STRING, comments: '描述'},
  needPassword: {type: Sequelize.BOOLEAN, comments: '加入是否需要密码'},
  password: {type: Sequelize.STRING, comments: '加入密码'},
  enable: Sequelize.BOOLEAN,
});

Team.belongsToMany(User, {through: TeamUser});
User.belongsToMany(Team, {through: TeamUser});

module.exports = Team;
