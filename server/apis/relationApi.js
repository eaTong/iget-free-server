
/**
 * Created by eaTong on 2020-02-13 .
 * Description: auto generated in  2020-02-13
 */

const {LogicError} = require("../framework/errors");
const relationService = require('../services/relationService');

module.exports = {
  addRelation: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return relationService.addRelation(ctx.request.body,loginUser);
  },
  updateRelations: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return relationService.updateRelations(ctx.request.body,loginUser);
  },
  deleteRelations: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return relationService.deleteRelations(ctx.request.body.ids,loginUser);
  },
  getRelations: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return relationService.getRelations(ctx.request.body,loginUser);
  },
  getRelationDetail: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return relationService.getRelationDetail(ctx.request.body,loginUser);
  }
};
  