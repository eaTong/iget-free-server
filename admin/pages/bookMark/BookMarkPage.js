/**
 * Created by eaTong on 2019-11-21 .
 * Description: auto generated in  2019-11-21
 */

import React, {Component} from 'react';
import {Button, message, Input, Card} from 'antd';
import Reactable from "@eatong/reactable";
import BookMarkFormModal from "./BookMarkFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";
import {bookMarkStatus} from "../../../bothSide/enums";
import DataGrid from "../../components/DataGrid";
import DataRow from "../../components/DataRow";
import moment from "moment";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name', render: (text, row) => row.book.name},
  {title: '副标题', key: 'subTitle', render: (text, row) => row.book.subTitle},
  {title: '作者', key: 'author', render: (text, row) => row.book.author},
  {title: '总字数', key: 'letterCount', render: (text, row) => row.book.letterCount},
  {title: '出版方', key: 'publisher', render: (text, row) => row.book.publisher},
  {title: '出版日期', key: 'publishTime', render: (text, row) => row.book.publishTime},
];

@inject('bookMark', 'app') @observer
class BookMarkPage extends PageBase {
  async componentDidMount() {
    await this.props.bookMark.getDataList();
  }

  renderBooks() {
    const {bookMark} = this.props;
    return bookMark.dataList.map(mark => {
      const bookItem = mark.book;
      return (
        <Card
          className={'book-item'}
          key={mark.id}
          cover={(
            <div
              className={`cover-image ${bookItem.coverImage ? '' : 'empty'}`}
              style={bookItem.coverImage && {backgroundImage: `url(${bookItem.coverImage || ''})`}}
            />)}
          actions={bookMarkStatus.slice(1, bookMarkStatus.length).map((status, index) => (
            <span key={status} onClick={() => bookMark.markBook(bookItem.bookId, {status: index + 1})}>{status}</span>
          ))}
          title={bookItem.name}
        >
          <DataGrid>
            <DataRow label={'作者'}>{bookItem.author}</DataRow>
            <DataRow
              label={'出版日期'}>{bookItem.publishTime && moment(bookItem.publishTime).format('YYYY-MM-DD')}</DataRow>
          </DataGrid>
          <div className="footer">
            <p className="star">
              {mark.star ? (<span className="star">{`我的评分：${mark.star}`}</span>) :
                <span className="placeholder">暂未评价</span>
              }
            </p>
            <div className="status">
              {bookMarkStatus[mark.status]}
            </div>
          </div>
        </Card>
      )
    })
  }

  render() {
    const {bookMark} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected, pagination} = bookMark;
    return (
      <div className="base-layout bookMark-page">
        <Title title='我的读书'/>
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
          </ButtonGroup>
        </div>
        <div className="book-list">{this.renderBooks()}</div>
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
