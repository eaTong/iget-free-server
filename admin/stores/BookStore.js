
/**
 * Created by eaTong on 2019-11-20 .
 * Description: auto generated in  2019-11-20
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class BookStore extends BaseStore {
  listApi = '/api/book/get';
  addApi = '/api/book/add';
  updateApi = '/api/book/update';
  deleteApi = '/api/book/delete';
  detailApi = '/api/book/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}