/**
 * Created by eatong on 18-2-8.
 */

const Router = require('koa-router');
const {checkArguments, checkLogin, structureData, insertLog} = require('./framework/middleWare');
const {ArgMissError, LogicError} = require('./framework/errors');

const fileApi = require('./apis/fileApi');
const userApi = require('./apis/userApi');
const menuApi = require('./apis/menuApi');
const bookApi = require('./apis/bookApi');
const bookMarkApi = require('./apis/bookMarkApi');
const bookNoteApi = require('./apis/bookNoteApi');
const teamApi = require('./apis/teamApi');
const objectiveApi = require('./apis/objectiveApi');
const feedbackApi = require('./apis/feedbackApi');
const contactApi = require('./apis/contactApi');
const tagApi = require('./apis/tagApi');
const relationApi = require('./apis/relationApi');
//UPDATE_TAG:importApi

const router = new Router();
//define data structure for all API
router.post('/api/*', checkLogin);
router.post('/api/*', structureData);

router.post('/api/user/login', insertLog('login', data => ({
  ...data,
  password: undefined
})), checkArguments(['account', 'password']), userApi.login);
router.post('/api/pub/quickLogin', insertLog('login'), userApi.quickLogin);
router.post('/api/pub/logout', userApi.logout);
router.post('/api/image/upload', fileApi.uploadImage);
router.post('/api/image/upload/base64', fileApi.uploadImageByBase64);
router.post('/api/pub/image/upload', fileApi.uploadImage);
router.post('/api/file/upload', fileApi.uploadFile);
router.post('/api/menu/get', menuApi.getMenus);
router.post('/api/menu/authorised', menuApi.getAuthorisedMenu);

router.post('/api/user/add', insertLog('add'), checkArguments(['account', 'name']), userApi.addUser);
router.post('/api/user/get', userApi.getUsers);
router.post('/api/user/update', insertLog('update'), checkArguments(['id',]), userApi.updateUsers);
router.post('/api/user/delete', insertLog('delete'), checkArguments(['ids']), userApi.deleteUsers);
router.post('/api/user/changePassword', insertLog('changePassword'), checkArguments(['password']), userApi.changePassword);

router.post('/api/book/add', insertLog('add'), checkArguments(['name']), bookApi.addBook);
router.post('/api/book/get', bookApi.getBooks);
router.post('/api/book/search', bookApi.searchBook);
router.post('/api/book/update', insertLog('update'), checkArguments(['id', 'name']), bookApi.updateBooks);
router.post('/api/book/delete', insertLog('delete'), checkArguments(['ids']), bookApi.deleteBooks);
router.post('/api/book/detail', checkArguments(['id']), bookApi.getBookDetail);

router.post('/api/bookMark/add', insertLog('add'), checkArguments(['bookId']), bookMarkApi.addBookMark);
router.post('/api/bookMark/get', bookMarkApi.getBookMarks);
router.post('/api/bookMark/statics', bookMarkApi.getBookMarksStatics);
router.post('/api/bookMark/mark', insertLog('mark'), checkArguments(['bookId']), bookMarkApi.markBook);
router.post('/api/bookMark/update', insertLog('update'), checkArguments(['id']), bookMarkApi.updateBookMarks);
router.post('/api/bookMark/rate', insertLog('update'), checkArguments(['bookId']), bookMarkApi.rate);
router.post('/api/bookMark/delete', insertLog('delete'), checkArguments(['ids']), bookMarkApi.deleteBookMarks);
router.post('/api/bookMark/detail', checkArguments(['id']), bookMarkApi.getBookMarkDetail);

router.post('/api/bookNote/add', insertLog('add'), checkArguments(['bookId']), bookNoteApi.addBookNote);
router.post('/api/bookNote/get', bookNoteApi.getBookNotes);
router.post('/api/bookNote/update', insertLog('update'), checkArguments(['id',]), bookNoteApi.updateBookNotes);
router.post('/api/bookNote/delete', insertLog('delete'), checkArguments(['ids']), bookNoteApi.deleteBookNotes);
router.post('/api/bookNote/detail', checkArguments(['id']), bookNoteApi.getBookNoteDetail);

router.post('/api/team/add', insertLog('add'), checkArguments(['name']), teamApi.addTeam);
router.post('/api/team/get', teamApi.getTeams);
router.post('/api/team/update', insertLog('update'), checkArguments(['id', 'name']), teamApi.updateTeams);
router.post('/api/team/delete', insertLog('delete'), checkArguments(['ids']), teamApi.deleteTeams);
router.post('/api/team/join', insertLog('join'), checkArguments(['teamId']), teamApi.joinTeam);
router.post('/api/team/quit', insertLog('quit'), checkArguments(['teamId']), teamApi.quitTeam);
router.post('/api/team/deleteMember', insertLog('deleteMember'), checkArguments(['teamId']), teamApi.deleteTeamMember);
router.post('/api/team/detail', checkArguments(['id']), teamApi.getTeamDetail);
router.post('/api/team/get/withUser', teamApi.getTeamsWithUser);

router.post('/api/objective/add', insertLog('add'), checkArguments(['name']), objectiveApi.addObjective);
router.post('/api/objective/get', objectiveApi.getObjectives);
router.post('/api/objective/update', insertLog('update'), checkArguments(['id']), objectiveApi.updateObjectives);
router.post('/api/objective/delete', insertLog('delete'), checkArguments(['ids']), objectiveApi.deleteObjectives);
router.post('/api/objective/detail', checkArguments(['id']), objectiveApi.getObjectiveDetail);
router.post('/api/objective/record', checkArguments(['objectiveId']), objectiveApi.addRecord);

router.post('/api/feedback/add', insertLog('add'), checkArguments(['name']), feedbackApi.addFeedback);
router.post('/api/feedback/get', feedbackApi.getFeedbacks);
router.post('/api/feedback/update', insertLog('update'), checkArguments(['id', 'name']), feedbackApi.updateFeedbacks);
router.post('/api/feedback/delete', insertLog('delete'), checkArguments(['ids']), feedbackApi.deleteFeedbacks);
router.post('/api/feedback/detail', checkArguments(['id']), feedbackApi.getFeedbackDetail);

router.post('/api/contact/add', insertLog('add'), checkArguments(['name']), contactApi.addContact);
router.post('/api/contact/get', contactApi.getContacts);
router.post('/api/contact/update', insertLog('update'), checkArguments(['id']), contactApi.updateContacts);
router.post('/api/contact/delete', insertLog('delete'), checkArguments(['ids']), contactApi.deleteContacts);
router.post('/api/contact/detail', checkArguments(['id']), contactApi.getContactDetail);
router.post('/api/contact/record', checkArguments(['contactId']), contactApi.addRecord);
router.post('/api/contact/import', contactApi.importContacts);
router.post('/api/contact/addRelation', checkArguments(['contactFromId', 'contactToId', 'relation']), contactApi.addRelation);

router.post('/api/tag/add', insertLog('add'), checkArguments(['name']), tagApi.addTag);
router.post('/api/tag/get', tagApi.getTags);
router.post('/api/tag/get/mine', tagApi.getMyTags);
router.post('/api/tag/get/ids', tagApi.getTagsByIds);
router.post('/api/tag/update', insertLog('update'), checkArguments(['id', 'name']), tagApi.updateTags);
router.post('/api/tag/delete', insertLog('delete'), checkArguments(['ids']), tagApi.deleteTags);
router.post('/api/tag/detail', checkArguments(['id']), tagApi.getTagDetail);

router.post('/api/relation/add', insertLog('add'), checkArguments(['name']), relationApi.addRelation);
router.post('/api/relation/get', relationApi.getRelations);
router.post('/api/relation/update', insertLog('update'), checkArguments(['id', 'name']), relationApi.updateRelations);
router.post('/api/relation/delete', insertLog('delete'), checkArguments(['ids']), relationApi.deleteRelations);
router.post('/api/relation/detail', checkArguments(['id']), relationApi.getRelationDetail);
//UPDATE_TAG:defineRouter

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
