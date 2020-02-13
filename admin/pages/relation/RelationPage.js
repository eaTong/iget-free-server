
/**
 * Created by eaTong on 2020-02-13 .
 * Description: auto generated in  2020-02-13
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import Reactable from "@eatong/reactable";
import RelationFormModal from "./RelationFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('relation','app') @observer
class RelationPage extends PageBase {
  async componentDidMount() {
    await this.props.relation.getDataList();
  }

  render() {
    const {relation} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected , pagination} = relation;
    return (
      <div className="base-layout relation-page">
        <Title title='relation管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => relation.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.relation.toggleFormModal('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => this.props.relation.toggleFormModal('edit')}
              disabled={selectedKeys.length !== 1}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.relation.deleteData()}
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
          tableId="relation-table"
          pagination={relation.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => relation.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <RelationFormModal
            onCancel={() => relation.toggleFormModal()}
            onOk={(data) => relation.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

RelationPage.propTypes = {};
export default RelationPage;
  