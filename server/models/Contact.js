/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Tag = require('./Tag');
const ContactTag = require('./ContactTag');
const ContactRecord = require('./ContactRecord');
const Relation = require('./Relation');
const ContactRelation = require('./ContactRelation');
const RelationContact = require('./RelationContact');

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
  userId: {type: Sequelize.INTEGER},
  enable: Sequelize.BOOLEAN,
});

Contact.hasMany(ContactRecord);
ContactRecord.belongsTo(Contact);
Contact.belongsToMany(Tag, {through: ContactTag});
Tag.belongsToMany(Contact, {through: ContactTag});

Contact.belongsToMany(Relation, {through: ContactRelation,});
Relation.belongsToMany(Contact, {through: ContactRelation,});

Contact.belongsToMany(Relation, {through: RelationContact,as:'relatedRelation'});
Relation.belongsToMany(Contact, {through: RelationContact,as:'relatedContact'});

module.exports = Contact;
