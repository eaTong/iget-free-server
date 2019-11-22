/**
 * Created by eaTong on 2019-11-21 .
 * Description: auto generated in  2019-11-21
 */

import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import {message, Modal, Form, DatePicker, Input} from 'antd';
import BaseStore from '~/stores/BaseStore'
import {GLOBAL_LAYOUT} from "../utils/constants";
import moment from "moment";
import React from "react";
import {bookMarkStatus} from "../../bothSide/enums";

const FormItem = Form.Item;

export default class BookMarkStore extends BaseStore {
  listApi = '/api/bookMark/get';
  addApi = '/api/bookMark/add';
  updateApi = '/api/bookMark/update';
  deleteApi = '/api/bookMark/delete';
  detailApi = '/api/bookMark/detail';
  @observable queryOption = {status: -1};

  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }

  @action
  async markBook(bookId, {status}) {
    let finishTime;
    if (status === 3) {
      finishTime = moment();
      Modal.confirm({
        title: '请确认读完日期',
        content: (
          <Form>
            <FormItem label={'读完日期'} {...GLOBAL_LAYOUT}>
              <DatePicker defaultValue={finishTime} onChange={(val => finishTime = val)}/>
            </FormItem>
          </Form>
        ),
        async onOk() {
          const {isNew} = await ajax({url: '/api/bookMark/mark', data: {bookId, finishTime, status}});
          message.success(isNew ? `已加入到${bookMarkStatus[status]}清单` : `更新状态为：${bookMarkStatus[status]}`);
        }
      })
    } else {
      const {isNew} = await ajax({url: '/api/bookMark/mark', data: {bookId, status}});
      message.success(isNew ? `已加入到${bookMarkStatus[status]}清单` : `更新状态为：${bookMarkStatus[status]}`);
    }
  }

  @action
  async rate(bookId, rate) {
    let reason;
    Modal.confirm({
      title: '请填写评分理由',
      content: (
        <Form>
          <Input.TextArea
            autoRows={{minRows: 3}}
            placeholder={'评分理由'}
            onChange={(event => reason = event.target.value)}/>
        </Form>
      ),
      async onOk() {
        await ajax({url: '/api/bookMark/rate', data: {bookId, rate, reason}});
        message.success('评分成功');
      }
    })
  }
}
