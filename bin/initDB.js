/**
 * Created by eatong on 18-2-11.
 */
const User = require('../server/models/User');
const OperationLog = require('../server/models/OperationLog');
const Menu = require('../server/models/Menu');
const Book = require('../server/models/Book');
const BookMark = require('../server/models/BookMark');
const RateHistory = require('../server/models/RateHistory');
const BookNote = require('../server/models/BookNote');
const Team = require('../server/models/Team');
const TeamUser = require('../server/models/TeamUser');
const Code = require('../server/models/Code');
const Objective = require('../server/models/Objective');
const ObjectiveRecord = require('../server/models/ObjectiveRecord');
const Feedback = require('../server/models/Feedback');
const Contact = require('../server/models/Contact');
const Tag = require('../server/models/Tag');
const ContactTag = require('../server/models/ContactTag');
const ContactRecord = require('../server/models/ContactRecord');
const Relation = require('../server/models/Relation');
const ContactRelation = require('../server/models/ContactRelation');
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
  await BookNote.sync({alter: true});
  await Team.sync({alter: true});
  await TeamUser.sync({alter: true});
  await Code.sync({alter: true});
  await Objective.sync({alter: true});
  await ObjectiveRecord.sync({alter: true});
  await Feedback.sync({alter: true});
  await Contact.sync({alter: true});
  await Relation.sync({alter: true});
  await Tag.sync({alter: true});
  await ContactRecord.sync({alter: true});
  await ContactTag.sync({alter: true});
  await ContactRelation.sync({alter: true});
//UPDATE_TAG:asyncModel
}

async function initialMenu() {
  const menuList = [
    {name: '书海', icon: 'book', path: '/admin/book', enable: true, parentPath: '', type: 1},
    {name: '藏书阁', icon: 'file', path: '/admin/bookMark', enable: true, parentPath: '', type: 1},
    {name: '心得', icon: 'file', path: '/admin/bookNote', enable: true, parentPath: '',type:1},
    {name: '团队', icon: 'file', path: '/admin/team', enable: true, parentPath: '',type:1},
    {name: 'OKR', icon: 'file', path: '/admin/objective', enable: true, parentPath: '',type:1},
    {name: 'feedback', icon: 'file', path: '/admin/feedback', enable: true, parentPath: '',type:1},
    {name: 'contact', icon: 'file', path: '/admin/contact', enable: true, parentPath: '',type:1},
//UPDATE_TAG:asyncMenu
  ];
  await Menu.bulkCreate(menuList, {updateOnDuplicate: ['path', 'name', 'icon', 'enable', 'parentPath', 'type']});
}
