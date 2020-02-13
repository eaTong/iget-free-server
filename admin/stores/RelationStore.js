
/**
 * Created by eaTong on 2020-02-13 .
 * Description: auto generated in  2020-02-13
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class RelationStore extends BaseStore {
  listApi = '/api/relation/get';
  addApi = '/api/relation/add';
  updateApi = '/api/relation/update';
  deleteApi = '/api/relation/delete';
  detailApi = '/api/relation/detail';

  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}