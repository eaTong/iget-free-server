
/**
 * Created by eaTong on 2020-01-29 .
 * Description: auto generated in  2020-01-29
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class FeedbackStore extends BaseStore {
  listApi = '/api/feedback/get';
  addApi = '/api/feedback/add';
  updateApi = '/api/feedback/update';
  deleteApi = '/api/feedback/delete';
  detailApi = '/api/feedback/detail';

  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}