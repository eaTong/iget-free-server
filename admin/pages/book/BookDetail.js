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
import {Button, Card, Icon, Rate, Timeline, Modal, message, Popover, List} from "antd";
import {bookMarkStatus, bookMarkStatusOptions} from "../../../bothSide/enums";
import Pictures from "../../components/Pictures";
import BookNoteFormModal from "../bookNote/BookNoteFormModal";
import PopoverSelect from "../../components/PopoverSelect";

const TimelineItem = Timeline.Item;
const ListItem = List.Item;

@inject('book', 'bookMark', 'bookNote') @observer
export default class BookDetailPage extends Component {
  state = {
    showNoteModal: false,
    noteItem: {},
    operateType: 'add',
  };

  async componentDidMount() {
    await this.getBookDetail()
  }

  async onSaveData(data) {
    data.bookId = this.props.query.id;
    if (this.state.operateType === 'add') {
      await this.props.bookNote.add(data);
    } else {
      await this.props.bookNote.update({...this.state.noteItem, ...data});
    }
    this.toggleNoteModal();
    this.getBookDetail()
  }

  deleteNote(noteId) {
    Modal.confirm({
      title: '操作确认',
      content: '删除后笔记将不能恢复，确认要删除吗？',
      onOk: async () => {
        await this.props.bookNote.delete([noteId]);
        message.success('删除成功');
        this.getBookDetail()
      }
    })
  }

  getBookDetail() {
    this.props.book.getDetailData(this.props.query.id);
  }


  toggleNoteModal(operateType, noteItem) {
    this.setState({operateType, noteItem, showNoteModal: !this.state.showNoteModal})
  }

  async rate(bookId, value) {
    await this.props.bookMark.rate(bookId, value);
    this.getBookDetail()
  }

  renderRateList() {
    const {book} = this.props;
    const bookItem = book.detailData || {};
    return (bookItem.rateHistories || []).map(rate => (
      <div className="rate-item" key={rate.id}>
        <div className="info">
          <div className="time">{moment(rate.createdAt).format('YYYY-MM-DD')}</div>
          <Rate value={rate.rate} disabled/>
        </div>
        <div className="reason">{rate.reason}</div>
      </div>
    ))
  }

  async markBook(bookId, data) {
    await this.props.bookMark.markBook(bookId, data);
    this.getBookDetail();
  }

  render() {
    const {showNoteModal, operateType, noteItem} = this.state;
    const {book, bookMark} = this.props;
    const bookItem = book.detailData || {};
    const mark = bookItem.mark || {};
    return (
      <div className="book-detail-page">

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
                <DataRow label={'出版日期'}>
                  {bookItem.publishTime && moment(bookItem.publishTime).format('YYYY-MM-DD')}
                </DataRow>
                {mark.id && (
                  <DataRow label={'我的评分'}>
                    <Rate value={mark.rate} onChange={(value) => this.rate(bookItem.id, value)}/>
                  </DataRow>
                )}
                <DataRow>
                  <div className="status-line">
                    <div className="status">
                      {bookMarkStatus[mark.status]}
                      {mark.status === 3 && (
                        <span className="et-remark">{moment(mark.finishTime).format('YYYY-MM-DD')}</span>
                      )}
                    </div>
                    <PopoverSelect
                      options={bookMarkStatusOptions}
                      value={mark.status}
                      onChange={(value) => this.markBook(bookItem.id, {status: value})}
                    >
                      <Icon type={'edit'} className={'edit icon'}/>
                    </PopoverSelect>
                  </div>
                </DataRow>
              </DataGrid>
            </Card>
            <div className="rate-list">
              {this.renderRateList()}
            </div>
          </div>
          <div className="note-list-container">
            <div className="header">
              <div className="label">我的心得</div>
              <Button onClick={() => this.toggleNoteModal('add')} type={'primary'}>记录心得</Button>
            </div>
            <Timeline className='note-list'>
              {(bookItem.bookNotes || []).map(note => (
                <TimelineItem key={note.id}>
                  <div className="note-detail">
                    <div className="time">{moment(note.createdAt).format('YYYY-MM-DD HH:mm:SS')}</div>
                    <p className="content">{note.content}</p>
                    {note.reference && (
                      <p className="reference">{note.reference}</p>
                    )}
                    <Pictures pictures={note.images}/>
                    <div className="operation">
                      <Icon type={'edit'} className={'edit icon'} onClick={() => this.toggleNoteModal('edit', note)}/>
                      <Icon type={'delete'} className={'delete icon'} onClick={() => this.deleteNote(note.id)}/>
                    </div>
                  </div>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </div>

        {showNoteModal && (
          <BookNoteFormModal
            disableBook
            onCancel={() => this.toggleNoteModal()}
            onOk={(data) => this.onSaveData(data)}
            operateType={operateType}
            formData={noteItem}
          />
        )}
      </div>
    )
  }
}
