/**
 * Created by eatong on 13-2-22.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const RelationContact = sequelize.define('relationContact', {}, {timestamps: false,});

module.exports = RelationContact;
