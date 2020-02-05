
/**
 * Created by eaTong on 2020-02-05 .
 * Description: auto generated in  2020-02-05
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import Reactable from "@eatong/reactable";
import TagFormModal from "./TagFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('tag','app') @observer
class TagPage extends PageBase {
  async componentDidMount() {
    await this.props.tag.getDataList();
  }

  render() {
    const {tag} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected , pagination} = tag;
    return (
      <div className="base-layout tag-page">
        <Title title='tag管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => tag.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.tag.toggleFormModal('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => this.props.tag.toggleFormModal('edit')}
              disabled={selectedKeys.length !== 1}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.tag.deleteData()}
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
          tableId="tag-table"
          pagination={tag.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => tag.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <TagFormModal
            onCancel={() => tag.toggleFormModal()}
            onOk={(data) => tag.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

TagPage.propTypes = {};
export default TagPage;
  