/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Tag = require('./Tag');
const ContactTag = require('./ContactTag');

const Contact = sequelize.define('contact', {
  name: {type: Sequelize.STRING},
  pinYin: {type: Sequelize.STRING},
  fullPinYin: {type: Sequelize.STRING},
  phone: {type: Sequelize.STRING},
  gender: {type: Sequelize.INTEGER},
  description: {type: Sequelize.STRING},
  avatar: {type: Sequelize.STRING},
  album:{type:Sequelize.JSON},
  birthday: {type: Sequelize.DATEONLY},
  userId: {type: Sequelize.INTEGER},
  enable: Sequelize.BOOLEAN,
});


Contact.belongsToMany(Tag, {through: ContactTag});
Tag.belongsToMany(Contact, {through: ContactTag});
module.exports = Contact;
