/**
 * Created by eatong on 18-2-20.
 */
const {Op} = require('sequelize');
const Menu = require('../models/Menu');

module.exports = {
  getMenus: async () => {
    const menus = await Menu.findAll({where: {enable: true}});
    return structureMenu(menus.map(menu => menu.dataValues));
  },

  getAuthorisedMenu: async (userId) => {
    const menus = await Menu.findAll({
      where: {enable: true},
    });
    return structureMenu(menus.map(menu => menu.dataValues))
  }
};

function structureMenu(menus) {
  let keyMapping = {};
  let parentKeyMapping = {};
  for (let menu of menus) {
    keyMapping[menu.path] = menu;
    if (!parentKeyMapping[menu.parentPath]) {
      parentKeyMapping[menu.parentPath] = [];
    }
    parentKeyMapping[menu.parentPath].push(menu);
  }

  function getChildrenPath(path) {
    return (parentKeyMapping[path] || []).map(item => ({...item, children: getChildrenPath(item.path)}));
  }

  return getChildrenPath('')
}

