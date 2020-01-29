
/**
 * Created by eaTong on 2020-01-29 .
 * Description: auto generated in  2020-01-29
 */

const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const Feedback = require('../models/Feedback');

module.exports = {
  addFeedback: async (feedback,loginUser) => {
    feedback.enable = true;
    feedback.userId = loginUser.id;

    return Feedback.create(feedback);
  },

  updateFeedbacks: async (feedback,loginUser) => {
    return Feedback.update(feedback, {where: {id: feedback.id,userId:loginUser.id}})
  },

  deleteFeedbacks: async (ids,loginUser) => {
    return Feedback.update({enable: false}, {where: {id: {[Op.in]: ids},userId:loginUser.id}});
  },

  getFeedbacks: async ({pageIndex = 0, pageSize = 20, keywords = ''},loginUser) => {
    const option = {where: {enable: true,userId:loginUser.id, name: {[Op.like]: `%${keywords}%`}}};
    const {dataValues: {total}} = await Feedback.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await Feedback.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  getFeedbackDetail: async ({id},loginUser) => {
    return Feedback.findOne({where: {id,userId:loginUser.id}});
  }
};
  