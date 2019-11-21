
/**
 * Created by eaTong on 2019-11-21 .
 * Description: auto generated in  2019-11-21
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class BookMarkStore extends BaseStore {
  listApi = '/api/bookMark/get';
  addApi = '/api/bookMark/add';
  updateApi = '/api/bookMark/update';
  deleteApi = '/api/bookMark/delete';
  detailApi = '/api/bookMark/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}