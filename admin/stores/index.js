/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import AppStore from './AppStore';
import UserStore from "~/stores/UserStore";
import BookStore from './BookStore';
import BookMarkStore from './BookMarkStore';
//UPDATE_TAG:importStore

export default {
  app: new AppStore(),
  user: new UserStore(),
book: new BookStore(),
bookMark: new BookMarkStore(),
//UPDATE_TAG:registerStore
}
