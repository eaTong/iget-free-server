/**
 * Created by eatong on 18-2-11.
 */
const User = require('../server/models/User');
const OperationLog = require('../server/models/OperationLog');
const Menu = require('../server/models/Menu');
const Book = require('../server/models/Book');
const BookMark = require('../server/models/BookMark');
const RateHistory = require('../server/models/RateHistory');
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
  await BookMark.sync({alter: true});
  await RateHistory.sync({alter: true});
//UPDATE_TAG:asyncModel
}

async function initialMenu() {
  const menuList = [
    {name: '书海', icon: 'book', path: '/admin/book', enable: true, parentPath: '', type: 1},
    {name: '藏书阁', icon: 'file', path: '/admin/bookMark', enable: true, parentPath: '', type: 1},
//UPDATE_TAG:asyncMenu
  ];
  await Menu.bulkCreate(menuList, {updateOnDuplicate: ['path', 'name', 'icon', 'enable', 'parentPath', 'type']});
}
