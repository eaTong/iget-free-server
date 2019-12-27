/**
 * Created by eaTong on 2019/1/6 .
 * Description:
 */
const {upperFirstLetter} = require("./utils");

const fs = require('fs');
const path = require('path');

module.exports.getModel = function (form) {
  return `
const Sequelize = require('sequelize');
const sequelize = require('../framework/database');

const ${upperFirstLetter(form)} = sequelize.define('${form}', {
  name: {type: Sequelize.STRING},
  enable: Sequelize.BOOLEAN,
});

module.exports = ${upperFirstLetter(form)};
`;
};

module.exports.getApi = function (form) {
  return `
const {LogicError} = require("../framework/errors");
const ${form}Service = require('../services/${form}Service');

module.exports = {
  add${upperFirstLetter(form)}: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await ${form}Service.add${upperFirstLetter(form)}(ctx.request.body,loginUser);
  },
  update${upperFirstLetter(form)}s: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await ${form}Service.update${upperFirstLetter(form)}s(ctx.request.body,loginUser);
  },
  delete${upperFirstLetter(form)}s: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await ${form}Service.delete${upperFirstLetter(form)}s(ctx.request.body.ids,loginUser);
  },
  get${upperFirstLetter(form)}s: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await ${form}Service.get${upperFirstLetter(form)}s(ctx.request.body,loginUser);
  },
  get${upperFirstLetter(form)}Detail: async (ctx) => {
    const loginUser = ctx.session.loginUser;
    return await ${form}Service.get${upperFirstLetter(form)}Detail(ctx.request.body,loginUser);
  }
};
  `;
};

module.exports.getService = function (form) {
  return `
const {Op} = require('sequelize');
const sequelize = require('../framework/database');
const {LogicError} = require('../framework/errors');
const ${upperFirstLetter(form)} = require('../models/${upperFirstLetter(form)}');

module.exports = {
  add${upperFirstLetter(form)}: async (${form},loginUser) => {
    ${form}.enable = true;
    ${form}.userId = loginUser.id;
   
    return await ${upperFirstLetter(form)}.create(${form});
  },

  update${upperFirstLetter(form)}s: async (${form},loginUser) => {
    return await ${upperFirstLetter(form)}.update(${form}, {where: {id: ${form}.id,userId:loginUser.id}})
  },

  delete${upperFirstLetter(form)}s: async (ids,loginUser) => {
    return await ${upperFirstLetter(form)}.update({enable: false}, {where: {id: {[Op.in]: ids},userId:loginUser.id}});
  },

  get${upperFirstLetter(form)}s: async ({pageIndex = 0, pageSize = 20, keywords = ''},loginUser) => {
    const option = {where: {enable: true,userId:loginUser.id, name: {[Op.like]: \`\%\${keywords}%\`}}}; 
    const {dataValues: {total}} = await ${upperFirstLetter(form)}.findOne({
      ...option,
      attributes: [[sequelize.fn('COUNT', '*'), 'total']]
    });
    const list = await ${upperFirstLetter(form)}.findAll({offset: pageIndex * pageSize, limit: pageSize, ...option});
    return {total, list}
  },

  get${upperFirstLetter(form)}Detail: async ({id},loginUser) => {
    return await ${upperFirstLetter(form)}.findOne({where: {id,userId:loginUser.id}});
  }
}; 
  `;
};

module.exports.getImportApi = function (form) {
  return `const ${form}Api = require('./apis/${form}Api');`
};

module.exports.getDefineRouter = function (form) {
  return `
router.post('/api/${form}/add', insertLog('add'), checkArguments(['name']), ${form}Api.add${upperFirstLetter(form)});
router.post('/api/${form}/get', ${form}Api.get${upperFirstLetter(form)}s);
router.post('/api/${form}/update', insertLog('update'), checkArguments(['id', 'name']), ${form}Api.update${upperFirstLetter(form)}s);
router.post('/api/${form}/delete', insertLog('delete'), checkArguments(['ids']), ${form}Api.delete${upperFirstLetter(form)}s);  
router.post('/api/${form}/detail',  checkArguments(['id']), ${form}Api.get${upperFirstLetter(form)}Detail); \
`
};

module.exports.getImportModel = function (form) {
  return `const ${upperFirstLetter(form)} = require('../server/models/${upperFirstLetter(form)}');`;
};

module.exports.getAsyncModel = function (form) {
  return `  await ${upperFirstLetter(form)}.sync({alter: true});`;
};

module.exports.getAsyncMenu = function (form) {
  return ` 
    {name: '${form}', icon: 'file', path: '/admin/${form}', enable: true, parentPath: '',type:1},
  `;
};

module.exports.getPage = function (form) {
  return `
import React, {Component} from 'react';
import {Button, message ,Input} from 'antd';
import Reactable from "@eatong/reactable";
import ${upperFirstLetter(form)}FormModal from "./${upperFirstLetter(form)}FormModal";
import {inject, observer} from "mobx-react";
import Title from "~/components/Title";
import PageBase from "~/components/PageBase";

const ButtonGroup = Button.Group;
const columns = [
  {title: '名称', key: 'name'},
];

@inject('${form}','app') @observer
class ${upperFirstLetter(form)}Page extends PageBase {
  async componentDidMount() {
    await this.props.${form}.getDataList();
  }

  render() {
    const {${form}} = this.props;
    const {dataList, operateType, showFormModal, selectedKeys, rowSelection, firstSelected , pagination} = ${form};
    return (
      <div className="base-layout ${form}-page">
        <Title title='${form}管理'/>
        <div className="operate-bar">
          <Input.Search
            className={'search'}
            placeholder={'输入关键字搜索'}
            onSearch={(val) => ${form}.searchData(val)}
          />
          
          <ButtonGroup className="buttons">
            <Button
              onClick={() => this.props.${form}.toggleFormModal('add')}
              type={'primary'}
            >
              新增
            </Button>
            <Button
              onClick={() => this.props.${form}.toggleFormModal('edit')}
              disabled={selectedKeys.length !== 1}
            >
              编辑
            </Button>
            <Button
              onClick={() => this.props.${form}.deleteData()}
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
          tableId="${form}-table"
          pagination={${form}.pagination}
          rowSelection={{
            selectedRowKeys: selectedKeys,
            onChange: (keys) => ${form}.onChangeSelection(keys)
          }}/>
        {showFormModal && (
          <${upperFirstLetter(form)}FormModal
            onCancel={() => ${form}.toggleFormModal()}
            onOk={(data) => ${form}.onSaveData(data)}
            operateType={operateType}
            formData={firstSelected}
          />
        )}
      </div>
    );
  }
}

${upperFirstLetter(form)}Page.propTypes = {};
export default ${upperFirstLetter(form)}Page;
  `;
};

module.exports.getFormModal = function (form) {
  return `
  import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message} from 'antd';
import {GLOBAL_LAYOUT} from '~/utils/constants';

const FormItem = Form.Item;

class ${upperFirstLetter(form)}FormModal extends Component {
  componentDidMount() {
    if (/(edit)|(copyAdd)/.test(this.props.operateType)) {
      this.props.form.setFieldsValue(this.props.formData);
    }
  }

  onSaveData() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.onOk && this.props.onOk(values);
    });
  }

  render() {
    const {operateType} = this.props;
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal title={(operateType === 'add' ? '新增' : '编辑') + ''}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <FormItem
            {...GLOBAL_LAYOUT}
            label="名称"
            hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写名称!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

${upperFirstLetter(form)}FormModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
${upperFirstLetter(form)}FormModal = Form.create()(${upperFirstLetter(form)}FormModal);
export default ${upperFirstLetter(form)}FormModal;`;
};

module.exports.getStore = function (form) {
  return `
import {observable, action} from 'mobx';
import ajax from "~/utils/ajax";
import BaseStore from '~/stores/BaseStore'

export default class ${upperFirstLetter(form)}Store extends BaseStore {
  listApi = '/api/${form}/get';
  addApi = '/api/${form}/add';
  updateApi = '/api/${form}/update';
  deleteApi = '/api/${form}/delete';
  detailApi = '/api/${form}/detail';
  
  @action
  async searchData(keywords) {
    this.queryOption = {keywords};
    this.pageIndex = 0;
    await this.getDataList();
  }
}`;
};

module.exports.getImportStore = function (form) {
  return `import ${upperFirstLetter(form)}Store from './${upperFirstLetter(form)}Store';`;
};

module.exports.getRegisterStore = function (form) {
  return `${form}: new ${upperFirstLetter(form)}Store(),`;
};

module.exports.getImportPage = function (form) {
  return `import ${upperFirstLetter(form)}Page from './pages/${form}/${upperFirstLetter(form)}Page';`;
};

module.exports.getAddPageRoute = function (form) {
  return `   '/admin/${form}': ${upperFirstLetter(form)}Page,`;
};
