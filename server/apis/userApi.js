/**
 * Created by eatong on 18-2-10.
 */
const {LogicError} = require("../framework/errors");
const userService = require('../services/userService');

module.exports = {
  addUser: async (ctx) => {
    return userService.addUser(ctx.request.body);
  },
  updateUsers: async (ctx) => {
    return userService.updateUsers(ctx.request.body);
  },
  deleteUsers: async (ctx) => {
    return userService.deleteUsers(ctx.request.body.ids);
  },
  getUsers: async (ctx) => {
    return userService.getUsers(ctx.request.body);
  },
  changePassword: async (ctx) => {
    const formData = ctx.request.body;
    formData.account = ctx.session.loginUser.account;
    return userService.changePassword(formData, ctx.session.loginUser);
  },
  login: async (ctx) => {
    const user = await userService.login(ctx.request.body);
    if (!user) {
      throw new LogicError('用户名或密码错误！');
    } else {
      ctx.session.loginUser = user;
      return user;
    }
  },
  quickLogin: async (ctx) => {
    const user = await userService.quickLogin(ctx.request.body);
    ctx.session.loginUser = user;
    return user;
  },
  logout: async (ctx) => {
    ctx.session.loginUser = null;
    return void 0;
  }
};

