
/**
 * Created by eaTong on 2019-11-23 .
 * Description: auto generated in  2019-11-23
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class BookNoteStore extends BaseStore {
  listApi = '/api/bookNote/get';
  addApi = '/api/bookNote/add';
  updateApi = '/api/bookNote/update';
  deleteApi = '/api/bookNote/delete';
  detailApi = '/api/bookNote/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}