const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const ContactTag = sequelize.define('contactTag', {});

module.exports = ContactTag;
