/**
 * Created by eatong on 18-2-11.
 */
const User = require('../server/models/User');
const OperationLog = require('../server/models/OperationLog');
const Menu = require('../server/models/Menu');
const Book = require('../server/models/Book');
//UPDATE_TAG:importModel

(async () => {
  await initialDatabaseStructure();
  await initialMenu();
  process.exit();
})();


async function initialDatabaseStructure() {

  await User.sync({alter: true});
  await OperationLog.sync({alter: true});
  await Menu.sync({alter: true});
  await Book.sync({alter: true});
//UPDATE_TAG:asyncModel
}

async function initialMenu() {
  const menuList = [

    {name: 'book', icon: 'book', path: '/admin/book', enable: true, parentPath: '',type:1},
    {name: '新增', icon: 'plus', path: '/admin/book/add', enable: true, parentPath: '/admin/book', type: 2},
    {name: '编辑', icon: 'edit', path: '/admin/book/edit', enable: true, parentPath: '/admin/book', type: 2},
    {name: '删除', icon: 'delete', path: '/admin/book/delete', enable: true, parentPath: '/admin/book', type: 2},

//UPDATE_TAG:asyncMenu
  ];
  await Menu.bulkCreate(menuList, {updateOnDuplicate: ['path', 'name', 'icon', 'enable', 'parentPath', 'type']});
}
