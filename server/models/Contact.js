/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

const uuid = require('uuid/v4');
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Tag = require('./Tag');
const ContactTag = require('./ContactTag');
const ContactRecord = require('./ContactRecord');

const Contact = sequelize.define('contact', {
  name: {type: Sequelize.STRING},
  pinYin: {type: Sequelize.STRING},
  fullPinYin: {type: Sequelize.STRING},
  phone: {type: Sequelize.STRING},
  gender: {type: Sequelize.INTEGER},
  description: {type: Sequelize.STRING},
  avatar: {type: Sequelize.STRING},
  album: {type: Sequelize.JSON},
  birthday: {type: Sequelize.DATEONLY},
  lastContactDate: {type: Sequelize.DATEONLY},
  userId: {type: Sequelize.INTEGER},
  enable: Sequelize.BOOLEAN,
  contactUniqueKey:{type:Sequelize.STRING, defaultValue: ()=>uuid(),unique:true}
});

Contact.hasMany(ContactRecord);
ContactRecord.belongsTo(Contact);
Contact.belongsToMany(Tag, {through: ContactTag});
Tag.belongsToMany(Contact, {through: ContactTag});


module.exports = Contact;
