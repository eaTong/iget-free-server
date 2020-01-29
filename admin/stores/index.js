/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import AppStore from './AppStore';
import UserStore from "~/stores/UserStore";
import BookStore from './BookStore';
import BookMarkStore from './BookMarkStore';
import BookNoteStore from './BookNoteStore';
import TeamStore from './TeamStore';
import ObjectiveStore from './ObjectiveStore';
import FeedbackStore from './FeedbackStore';
//UPDATE_TAG:importStore

export default {
  app: new AppStore(),
  user: new UserStore(),
book: new BookStore(),
bookMark: new BookMarkStore(),
bookNote: new BookNoteStore(),
team: new TeamStore(),
objective: new ObjectiveStore(),
feedback: new FeedbackStore(),
//UPDATE_TAG:registerStore
}
