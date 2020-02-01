
/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class ContactStore extends BaseStore {
  listApi = '/api/contact/get';
  addApi = '/api/contact/add';
  updateApi = '/api/contact/update';
  deleteApi = '/api/contact/delete';
  detailApi = '/api/contact/detail';

  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}