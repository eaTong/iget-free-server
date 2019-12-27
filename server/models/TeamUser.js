/**
 * created by eaTong at 2019/12/27
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const TeamUser = sequelize.define('teamUser', {
  userId: {type: Sequelize.INTEGER},
  isOwner: {type: Sequelize.BOOLEAN},
});

module.exports = TeamUser;
