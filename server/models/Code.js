/**
 * Created by eaTong on 2018/9/2 .
 * Description:
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Code = sequelize.define('code', {
  max: Sequelize.INTEGER,
  type: Sequelize.STRING,
});


module.exports = Code;
