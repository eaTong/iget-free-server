
/**
 * Created by eaTong on 2019-11-20 .
 * Description: auto generated in  2019-11-20
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import Reactable from "@eatong/reactable";
import BookFormModal from "./BookFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '书名', key: 'name'},
  {title: '副标题', key: 'subTitle'},
  {title: '作者', key: 'author'},
  {title: '总字数', key: 'letterCount'},
  {title: '出版方', key: 'publisher'},
  {title: '出版日期', key: 'publishTime'},
];

@inject('book','app') @observer
class BookPage extends PageBase {
  async componentDidMount() {
    await this.props.book.getDataList();
  }

  render() {
    const {book} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected , pagination} = book;
    return (
      <div className="base-layout book-page">
        <Title title='书籍管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => book.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.book.toggleFormModal('add')}
              type={'primary'}
            >
              新增
            </Button>
          </ButtonGroup>
        </div>
        <Reactable
          columns={columns}
          dataSource={dataList}
          rowKey="id"
          tableId="book-table"
          pagination={book.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => book.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <BookFormModal
            onCancel={() => book.toggleFormModal()}
            onOk={(data) => book.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

BookPage.propTypes = {};
export default BookPage;
