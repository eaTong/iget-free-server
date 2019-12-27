
/**
 * Created by eaTong on 2019-12-27 .
 * Description: auto generated in  2019-12-27
 */

import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import Reactable from "@eatong/reactable";
import TeamFormModal from "./TeamFormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('team','app') @observer
class TeamPage extends PageBase {
  async componentDidMount() {
    await this.props.team.getDataList();
  }

  render() {
    const {team} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected , pagination} = team;
    return (
      <div className="base-layout team-page">
        <Title title='team管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => team.searchData(val)}
          />

          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.team.toggleFormModal('add')}
              type={'primary'}
            >
              创建团队
            </Button>
            <Button
              onClick={() => this.props.team.toggleFormModal('edit')}
              disabled={selectedKeys.length !== 1}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.team.deleteData()}
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
          tableId="team-table"
          pagination={team.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => team.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <TeamFormModal
            onCancel={() => team.toggleFormModal()}
            onOk={(data) => team.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

TeamPage.propTypes = {};
export default TeamPage;
