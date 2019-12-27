
/**
 * Created by eaTong on 2019-12-27 .
 * Description: auto generated in  2019-12-27
 */

const {LogicError} = require("../framework/errors");
const teamService = require('../services/teamService');

module.exports = {
  addTeam: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await teamService.addTeam(ctx.request.body,loginUser);
  },
  updateTeams: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await teamService.updateTeams(ctx.request.body,loginUser);
  },
  deleteTeams: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await teamService.deleteTeams(ctx.request.body.ids,loginUser);
  },
  getTeams: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await teamService.getTeams(ctx.request.body,loginUser);
  },
  getTeamDetail: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await teamService.getTeamDetail(ctx.request.body,loginUser);
  }
};
  