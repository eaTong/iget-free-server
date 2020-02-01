
/**
 * Created by eaTong on 2020-02-01 .
 * Description: auto generated in  2020-02-01
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import Reactable from "@eatong/reactable";
import ContactFormModal from "./ContactFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('contact','app') @observer
class ContactPage extends PageBase {
  async componentDidMount() {
    await this.props.contact.getDataList();
  }

  render() {
    const {contact} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected , pagination} = contact;
    return (
      <div className="base-layout contact-page">
        <Title title='contact管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => contact.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.contact.toggleFormModal('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => this.props.contact.toggleFormModal('edit')}
              disabled={selectedKeys.length !== 1}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.contact.deleteData()}
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
          tableId="contact-table"
          pagination={contact.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => contact.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <ContactFormModal
            onCancel={() => contact.toggleFormModal()}
            onOk={(data) => contact.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

ContactPage.propTypes = {};
export default ContactPage;
  