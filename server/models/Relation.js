/**
 * Created by eaTong on 2020-02-05 .
 * Description: auto generated in  2020-02-05
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Relation = sequelize.define('relation', {
  name: {type: Sequelize.STRING},
  pinYin: {type: Sequelize.STRING},
  fullPinYin: {type: Sequelize.STRING}
});



module.exports = Relation;
