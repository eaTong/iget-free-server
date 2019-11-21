
/**
 * Created by eaTong on 2019-11-21 .
 * Description: auto generated in  2019-11-21
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import Reactable from "@eatong/reactable";
import BookMarkFormModal from "./BookMarkFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('bookMark','app') @observer
class BookMarkPage extends PageBase {
  async componentDidMount() {
    await this.props.bookMark.getDataList();
  }

  render() {
    const {bookMark} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected , pagination} = bookMark;
    return (
      <div className="base-layout bookMark-page">
        <Title title='bookMark管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => bookMark.searchData(val)}
          />
          
          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.bookMark.toggleFormModal('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => this.props.bookMark.toggleFormModal('edit')}
              disabled={selectedKeys.length !== 1}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.bookMark.deleteData()}
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
          tableId="bookMark-table"
          pagination={bookMark.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => bookMark.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <BookMarkFormModal
            onCancel={() => bookMark.toggleFormModal()}
            onOk={(data) => bookMark.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

BookMarkPage.propTypes = {};
export default BookMarkPage;
  