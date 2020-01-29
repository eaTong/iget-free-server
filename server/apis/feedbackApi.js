
/**
 * Created by eaTong on 2020-01-29 .
 * Description: auto generated in  2020-01-29
 */

const {LogicError} = require("../framework/errors");
const feedbackService = require('../services/feedbackService');

module.exports = {
  addFeedback: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return feedbackService.addFeedback(ctx.request.body,loginUser);
  },
  updateFeedbacks: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return feedbackService.updateFeedbacks(ctx.request.body,loginUser);
  },
  deleteFeedbacks: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return feedbackService.deleteFeedbacks(ctx.request.body.ids,loginUser);
  },
  getFeedbacks: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return feedbackService.getFeedbacks(ctx.request.body,loginUser);
  },
  getFeedbackDetail: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return feedbackService.getFeedbackDetail(ctx.request.body,loginUser);
  }
};
  