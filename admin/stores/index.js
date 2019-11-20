/**
 * Created by eaTong on 2018/6/16 .
 * Description:
 */
import AppStore from './AppStore';
import UserStore from "~/stores/UserStore";
//UPDATE_TAG:importStore

export default {
  app: new AppStore(),
  user: new UserStore(),
//UPDATE_TAG:registerStore
}
