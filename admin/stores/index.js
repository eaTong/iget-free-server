/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import AppStore from './AppStore';
import UserStore from "~/stores/UserStore";
import BookStore from './BookStore';
//UPDATE_TAG:importStore

export default {
  app: new AppStore(),
  user: new UserStore(),
book: new BookStore(),
//UPDATE_TAG:registerStore
}
