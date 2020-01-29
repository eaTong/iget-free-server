
/**
 * Created by eaTong on 2020-01-29 .
 * Description: auto generated in  2020-01-29
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import Reactable from "@eatong/reactable";
import FeedbackFormModal from "./FeedbackFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('feedback','app') @observer
class FeedbackPage extends PageBase {
  async componentDidMount() {
    await this.props.feedback.getDataList();
  }

  render() {
    const {feedback} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected , pagination} = feedback;
    return (
      <div className="base-layout feedback-page">
        <Title title='feedback管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => feedback.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.feedback.toggleFormModal('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => this.props.feedback.toggleFormModal('edit')}
              disabled={selectedKeys.length !== 1}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.feedback.deleteData()}
              disabled={selectedKeys.length === 0}
            >
              删除
            </Button>
          </ButtonGroup>
        </div>
        <Reactable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="feedback-table"
          pagination={feedback.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => feedback.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <FeedbackFormModal
            onCancel={() => feedback.toggleFormModal()}
            onOk={(data) => feedback.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

FeedbackPage.propTypes = {};
export default FeedbackPage;
  