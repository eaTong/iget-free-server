
/**
 * Created by eaTong on 2020-01-10 .
 * Description: auto generated in  2020-01-10
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class ObjectiveStore extends BaseStore {
  listApi = '/api/objective/get';
  addApi = '/api/objective/add';
  updateApi = '/api/objective/update';
  deleteApi = '/api/objective/delete';
  detailApi = '/api/objective/detail';

  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}