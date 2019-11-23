/**
 * Created by eaTong on 2019-11-23 .
 * Description: auto generated in  2019-11-23
 */

import React, {Component} from 'react';
import {Button, message, Input} from 'antd';
import Reactable from "@eatong/reactable";
import BookNoteFormModal from "./BookNoteFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'book', render: (book) => book.name},
  {title: '笔记内容', key: 'content'},
  {title: '引用', key: 'reference'},
];

@inject('bookNote', 'app') @observer
class BookNotePage extends PageBase {
  async componentDidMount() {
    await this.props.bookNote.getDataList();
  }

  render() {
    const {bookNote} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected, pagination} = bookNote;
    return (
      <div className="base-layout bookNote-page">
        <Title title='bookNote管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => bookNote.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.bookNote.toggleFormModal('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => this.props.bookNote.toggleFormModal('edit')}
              disabled={selectedKeys.length !== 1}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.bookNote.deleteData()}
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
          tableId="bookNote-table"
          pagination={bookNote.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => bookNote.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <BookNoteFormModal
            onCancel={() => bookNote.toggleFormModal()}
            onOk={(data) => bookNote.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

BookNotePage.propTypes = {};
export default BookNotePage;
