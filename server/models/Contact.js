/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const Contact = sequelize.define('contact', {
  name: {type: Sequelize.STRING},
  phone: {type: Sequelize.STRING},
  gender: {type: Sequelize.INTEGER},
  birthday: {type: Sequelize.DATEONLY},
  userId: {type: Sequelize.INTEGER},
  enable: Sequelize.BOOLEAN,
});

module.exports = Contact;
