
/**
 * Created by eaTong on 2019-12-27 .
 * Description: auto generated in  2019-12-27
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class TeamStore extends BaseStore {
  listApi = '/api/team/get';
  addApi = '/api/team/add';
  updateApi = '/api/team/update';
  deleteApi = '/api/team/delete';
  detailApi = '/api/team/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}