
/**
 * Created by eaTong on 2020-01-10 .
 * Description: auto generated in  2020-01-10
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import Reactable from "@eatong/reactable";
import ObjectiveFormModal from "./ObjectiveFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";
import moment from "moment";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
  {title: '备注', key: 'description'},
  {title: '达成奖励', key: 'reward'},
  {title: '奖励已发放', key: 'rewarded'},
  {title: '计划开始日期', key: 'planStartDate'},
  {title: '计划结束日期', key: 'planEndDate'},
  {title: '创建日期', key: 'createdAt',render:val=>moment(val).format('YYYY-MM-DD HH:mm:SS')},
];

@inject('objective','app') @observer
class ObjectivePage extends PageBase {
  async componentDidMount() {
    await this.props.objective.getDataList();
  }

  render() {
    const {objective} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected , pagination} = objective;
    return (
      <div className="base-layout objective-page">
        <Title title='OKR'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => objective.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.objective.toggleFormModal('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => this.props.objective.toggleFormModal('edit')}
              disabled={selectedKeys.length !== 1}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.objective.deleteData()}
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
          tableId="objective-table"
          pagination={objective.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => objective.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <ObjectiveFormModal
            onCancel={() => objective.toggleFormModal()}
            onOk={(data) => objective.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

ObjectivePage.propTypes = {};
export default ObjectivePage;
