/**
 * Created by eaTong on 2019-11-24 .
 * Description:
 */
import React, {Component} from 'react';
import {observer, inject} from 'mobx-react'
import {Link} from "react-router-dom";
import DataGrid from "../../components/DataGrid";
import DataRow from "../../components/DataRow";
import moment from "moment";
import {Card, Rate} from "antd";
import {bookMarkStatus} from "../../../bothSide/enums";

@inject('book', 'bookMark') @observer
export default class MemberPage extends Component {
  async componentDidMount() {
    this.props.book.getDetailData(this.props.query.id);
  }

  render() {
    const {bookMark, book} = this.props;
    const bookItem = book.detailData || {};
    const mark = bookItem.bookMarks ? (bookItem.bookMarks[0] || {}) : {};
    return (
      <div className={'book-detail'}>
        <div className="book-item-container">
          <Card
            className={'book-item'}
            cover={(
              <div
                className={`cover-image ${bookItem.coverImage ? '' : 'empty'}`}
                style={bookItem.coverImage ? {backgroundImage: `url(${bookItem.coverImage || ''})`} : null}
              />)}
            title={bookItem.name}
          >
            <DataGrid>
              <DataRow label={'作者'}>{bookItem.author}</DataRow>
              <DataRow
                label={'出版日期'}>{bookItem.publishTime && moment(bookItem.publishTime).format('YYYY-MM-DD')}</DataRow>

              {mark.id && (
                <DataRow label={'我的评分'}>
                  <Rate defaultValue={mark.rate} onChange={(value) => bookMark.rate(bookItem.id, value)}/>
                </DataRow>
              )}
            </DataGrid>
          </Card>
        </div>
      </div>
    )
  }
}
