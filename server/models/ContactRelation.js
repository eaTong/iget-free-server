/**
 * Created by eaTong on 2020-02-14 .
 * Description: auto generated in  2020-02-01
 */

const Sequelize = require('sequelize');
const sequelize = require('../framework/database');
const Contact = require('./Contact');
const Relation = require('./Relation');

const ContactRelation = sequelize.define('contactRelation', {
  contactFromId: {type: Sequelize.INTEGER},
  relationId: {type: Sequelize.INTEGER},
  contactToId: {type: Sequelize.INTEGER},
});

ContactRelation.belongsTo(Contact, {foreignKey: 'contactFromId', as: 'contactFrom'});
ContactRelation.belongsTo(Contact, {foreignKey: 'contactToId', as: 'contactTo'});
ContactRelation.belongsTo(Relation, {foreignKey: 'relationId', as: 'relation'});

module.exports = ContactRelation;
