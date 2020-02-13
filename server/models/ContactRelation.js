/**
 * Created by eatong on 13-2-22.
 */
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const ContactRelation = sequelize.define('contactRelation', {}, {timestamps: false,});

module.exports = ContactRelation;
