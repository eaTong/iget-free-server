/**
 * Created by eaTong on 2019-11-21 .
 * Description: auto generated in  2019-11-21
 */

import React, {Component} from 'react';
import {Button, message, Input, Card, Pagination, Radio, Rate} from 'antd';
import BookMarkFormModal from "./BookMarkFormModal";
import {inject, observer} from "mobx-react";
import PageBase from "~/components/PageBase";
import {bookMarkStatus} from "../../../bothSide/enums";
import DataGrid from "../../components/DataGrid";
import DataRow from "../../components/DataRow";
import moment from "moment";
import {Link} from "react-router-dom";

const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;

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
          extra={<Link to={`/admin/bookDetail?id=${bookItem.id}`}>更多</Link>}
          cover={(
            <div
              className={`cover-image ${bookItem.coverImage ? '' : 'empty'}`}
              style={bookItem.coverImage ? {backgroundImage: `url(${bookItem.coverImage || ''})`} : null}
            />)}
          title={bookItem.name}
        >
          <DataGrid>
            <DataRow label={'作者'}>{bookItem.author}</DataRow>
            <DataRow label={'出版日期'}>
              {bookItem.publishTime && moment(bookItem.publishTime).format('YYYY-MM-DD')}
            </DataRow>
          </DataGrid>
          <div className="footer">
            <div className="rate">
              <Rate defaultValue={mark.rate} onChange={(value) => bookMark.rate(bookItem.id, value)}/>
            </div>
            <div className="status">
              {bookMarkStatus[mark.status]}
              {mark.status === 3 && (
                <span className="et-remark">{moment(mark.finishTime).format('YYYY-MM-DD')}</span>
              )}
            </div>
          </div>
        </Card>
      )
    })
  }

  render() {
    const {bookMark} = this.props;
    const {operateType, showFormModal, selectedKeys, rowSelection, firstSelected, pagination} = bookMark;
    return (
      <div className="base-layout bookMark-page">
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
        <div className="filter-bar">
          <Radio.Group
            value={bookMark.queryOption.status}
            onChange={(event) => bookMark.onChangeQueryOption('status', event.target.value)}
          >
            <Radio.Button value={-1}>全部</Radio.Button>
            {bookMarkStatus.map((status, index) => (
              <Radio.Button value={index} key={status}>{status}</Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div className="book-list">{this.renderBooks()}</div>
        <Pagination {...bookMark.pagination}/>
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
