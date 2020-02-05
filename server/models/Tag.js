
/**
 * Created by eaTong on 2020-02-05 .
 * Description: auto generated in  2020-02-05
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Tag = sequelize.define('tag', {
  name: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = Tag;
