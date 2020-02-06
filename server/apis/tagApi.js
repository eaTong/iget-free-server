
/**
 * Created by eaTong on 2020-02-05 .
 * Description: auto generated in  2020-02-05
 */

const {LogicError} = require("../framework/errors");
const tagService = require('../services/tagService');

module.exports = {
  addTag: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return tagService.addTag(ctx.request.body,loginUser);
  },
  updateTags: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return tagService.updateTags(ctx.request.body,loginUser);
  },
  deleteTags: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return tagService.deleteTags(ctx.request.body.ids,loginUser);
  },
  getTags: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return tagService.getTags(ctx.request.body,loginUser);
  },
  getMyTags: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return tagService.getMyTags(ctx.request.body,loginUser);
  },
  getTagsByIds: async (ctx) => {
    return tagService.getTagsByIds(ctx.request.body);
  },
  getTagDetail: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return tagService.getTagDetail(ctx.request.body,loginUser);
  }
};
