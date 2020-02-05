
/**
 * Created by eaTong on 2020-02-05 .
 * Description: auto generated in  2020-02-05
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class TagStore extends BaseStore {
  listApi = '/api/tag/get';
  addApi = '/api/tag/add';
  updateApi = '/api/tag/update';
  deleteApi = '/api/tag/delete';
  detailApi = '/api/tag/detail';

  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}