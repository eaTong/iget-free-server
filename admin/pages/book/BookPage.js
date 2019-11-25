/**
 * Created by eaTong on 2019-11-20 .
 * Description: auto generated in  2019-11-20
 */

import React, {Component} from 'react';
import {Button, message, Input, Card, Pagination} from 'antd';
import Reactable from "@eatong/reactable";
import BookFormModal from "./BookFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";
import DataGrid from "../../components/DataGrid";
import DataRow from "../../components/DataRow";
import moment from "moment";
import {bookMarkStatus} from "../../../bothSide/enums";
import {Link} from "react-router-dom";

const ButtonGroup = Button.Group;

@inject('book', 'app', 'bookMark') @observer
class BookPage extends PageBase {
  async componentDidMount() {
    await this.props.book.getDataList();
  }

  renderBooks() {
    const {book, bookMark} = this.props;
    return book.dataList.map(bookItem => (
      <Card
        className={'book-item'}
        key={bookItem.id}
        extra={<Link to={`/admin/bookDetail?id=${bookItem.id}`}>更多</Link>}
        cover={(
          <div className={`cover-image ${bookItem.coverImage ? '' : 'empty'}`}
               style={bookItem.coverImage ? {backgroundImage: `url(${bookItem.coverImage || ''})`} : null}
          />)}
        actions={bookMarkStatus.slice(1, bookMarkStatus.length).map((status, index) => (
          <span key={status} onClick={() => bookMark.markBook(bookItem.id, {status: index + 1})}>{status}</span>
        ))}
        title={bookItem.name}
      >
        <DataGrid>
          <DataRow label={'作者'}>{bookItem.author}</DataRow>
          <DataRow label={'出版日期'}>{bookItem.publishTime && moment(bookItem.publishTime).format('YYYY-MM-DD')}</DataRow>
        </DataGrid>
      </Card>
    ))
  }

  render() {
    const {book} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected, pagination} = book;
    return (
      <div className="base-layout book-page">
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
        <div className="book-list">
          {this.renderBooks()}
        </div>
        <Pagination {...book.pagination}/>
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
