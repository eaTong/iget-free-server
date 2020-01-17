/**
 * Created by eatong on 18-2-20.
 */
const menuService = require('../services/menuService');

module.exports = {
  getMenus: async (ctx) => {
    return menuService.getMenus();
  },
  getAuthorisedMenu: async (ctx) => {
    return menuService.getAuthorisedMenu(ctx.session.loginUser.id);
  }
};

