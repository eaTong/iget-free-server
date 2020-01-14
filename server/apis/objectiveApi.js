
/**
 * Created by eaTong on 2020-01-10 .
 * Description: auto generated in  2020-01-10
 */

const {LogicError} = require("../framework/errors");
const objectiveService = require('../services/objectiveService');

module.exports = {
  addObjective: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return objectiveService.addObjective(ctx.request.body,loginUser);
  },
  updateObjectives: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return objectiveService.updateObjectives(ctx.request.body,loginUser);
  },
  deleteObjectives: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return objectiveService.deleteObjectives(ctx.request.body.ids,loginUser);
  },
  getObjectives: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return objectiveService.getObjectives(ctx.request.body,loginUser);
  },
  getObjectiveDetail: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return objectiveService.getObjectiveDetail(ctx.request.body,loginUser);
  }
};
  