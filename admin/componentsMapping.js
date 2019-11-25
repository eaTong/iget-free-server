import AdminIndexPage from '~/pages/AdminIndexPage';
import UserPage from '~/pages/user/UserPage';
import BookPage from './pages/book/BookPage';
import BookMarkPage from './pages/bookMark/BookMarkPage';
import BookNotePage from './pages/bookNote/BookNotePage';
import BookDetail from "./pages/book/BookDetail";
//UPDATE_TAG:importPage

const componentsMapping = {
  '/admin': AdminIndexPage,
  '/admin/user': UserPage,
  '/admin/book': BookPage,
  '/admin/bookMark': BookMarkPage,
  '/admin/bookNote': BookNotePage,
  '/admin/bookDetail': BookDetail,
//UPDATE_TAG:addPageRoute
};

export default componentsMapping;
