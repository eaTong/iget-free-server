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
//UPDATE_TAG:importApi

const router = new Router();
//define data structure for all API
router.post('/api/*', checkLogin);
router.post('/api/*', structureData);

router.post('/api/user/login', insertLog('login'), checkArguments(['account', 'password']), userApi.login);
router.post('/api/image/upload', fileApi.uploadImage);
router.post('/api/file/upload', fileApi.uploadFile);
router.post('/api/menu/get', menuApi.getMenus);
router.post('/api/menu/authorised', menuApi.getAuthorisedMenu);

router.post('/api/user/add', insertLog('add'), checkArguments(['account', 'name']), userApi.addUser);
router.post('/api/user/get', userApi.getUsers);
router.post('/api/user/update', insertLog('update'), checkArguments(['id', 'account', 'name']), userApi.updateUsers);
router.post('/api/user/delete', insertLog('delete'), checkArguments(['ids']), userApi.deleteUsers);
router.post('/api/user/changePassword', insertLog('changePassword'), checkArguments(['password', 'originPassword']), userApi.changePassword);

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
router.post('/api/bookNote/detail',  checkArguments(['id']), bookNoteApi.getBookNoteDetail);
//UPDATE_TAG:defineRouter

router.post('/api/*', async ctx => {
  ctx.status = 404;
  ctx.body = 'api not found';
});

module.exports = router;
