import AdminIndexPage from '~/pages/AdminIndexPage';
import UserPage from '~/pages/user/UserPage';
import BookPage from './pages/book/BookPage';
import BookMarkPage from './pages/bookMark/BookMarkPage';
import BookNotePage from './pages/bookNote/BookNotePage';
import BookDetail from "./pages/book/BookDetail";
import TeamPage from './pages/team/TeamPage';
import ObjectivePage from './pages/objective/ObjectivePage';
import FeedbackPage from './pages/feedback/FeedbackPage';
import ContactPage from './pages/contact/ContactPage';
import TagPage from './pages/tag/TagPage';
import RelationPage from './pages/relation/RelationPage';
//UPDATE_TAG:importPage

const componentsMapping = {
  '/admin': AdminIndexPage,
  '/admin/user': UserPage,
  '/admin/book': BookPage,
  '/admin/bookMark': BookMarkPage,
  '/admin/bookNote': BookNotePage,
  '/admin/bookDetail': BookDetail,
   '/admin/team': TeamPage,
   '/admin/objective': ObjectivePage,
   '/admin/feedback': FeedbackPage,
   '/admin/contact': ContactPage,
   '/admin/tag': TagPage,
   '/admin/relation': RelationPage,
//UPDATE_TAG:addPageRoute
};

export default componentsMapping;
