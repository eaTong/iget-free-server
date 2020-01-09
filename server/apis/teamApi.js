
/**
 * Created by eaTong on 2019-12-27 .
 * Description: auto generated in  2019-12-27
 */

const {LogicError} = require("../framework/errors");
const teamService = require('../services/teamService');

module.exports = {
  addTeam: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return teamService.addTeam(ctx.request.body,loginUser);
  },
  updateTeams: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return teamService.updateTeams(ctx.request.body,loginUser);
  },
  deleteTeams: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return teamService.deleteTeams(ctx.request.body.ids,loginUser);
  },
  joinTeam: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return teamService.joinTeam(ctx.request.body,loginUser);
  },
  quitTeam: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return teamService.quitTeam(ctx.request.body,loginUser);
  },
  deleteTeamMember: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return teamService.deleteTeamMember(ctx.request.body,loginUser);
  },
  getTeams: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return teamService.getTeams(ctx.request.body,loginUser);
  },
  getTeamDetail: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return teamService.getTeamDetail(ctx.request.body,loginUser);
  }
};
