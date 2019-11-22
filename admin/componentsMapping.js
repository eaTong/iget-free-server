import AdminIndexPage from '~/pages/AdminIndexPage';
import UserPage from '~/pages/user/UserPage';
import BookPage from './pages/book/BookPage';
import BookMarkPage from './pages/bookMark/BookMarkPage';
//UPDATE_TAG:importPage

const componentsMapping = {
  '/admin/index': AdminIndexPage,
  '/admin/user': UserPage,
  '/admin/book': BookPage,
  '/admin/bookMark': BookMarkPage,
//UPDATE_TAG:addPageRoute
};

export default componentsMapping;
