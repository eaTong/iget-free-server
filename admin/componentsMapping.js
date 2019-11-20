import AdminIndexPage from '~/pages/AdminIndexPage';
import UserPage from '~/pages/user/UserPage';
import BookPage from './pages/book/BookPage';
//UPDATE_TAG:importPage

const componentsMapping = {
  '/admin/index': AdminIndexPage,
  '/admin/user': UserPage,
   '/admin/book': BookPage,
//UPDATE_TAG:addPageRoute
};

export default componentsMapping;
