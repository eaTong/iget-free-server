import AdminIndexPage from '~/pages/AdminIndexPage';
import UserPage from '~/pages/user/UserPage';
import BookPage from './pages/book/BookPage';
import BookMarkPage from './pages/bookMark/BookMarkPage';
import BookNotePage from './pages/bookNote/BookNotePage';
//UPDATE_TAG:importPage

const componentsMapping = {
  '/admin': AdminIndexPage,
  '/admin/user': UserPage,
  '/admin/book': BookPage,
  '/admin/bookMark': BookMarkPage,
   '/admin/bookNote': BookNotePage,
//UPDATE_TAG:addPageRoute
};

export default componentsMapping;
