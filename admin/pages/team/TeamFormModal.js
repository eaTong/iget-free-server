/**
 * Created by eaTong on 2019-12-27 .
 * Description: auto generated in  2019-12-27
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message} from 'antd';
import {GLOBAL_LAYOUT} from '~/utils/constants';

const FormItem = Form.Item;

class TeamFormModal extends Component {
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
      <Modal title={(operateType === 'add' ? '创建' : '编辑') + '团队'}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <FormItem {...GLOBAL_LAYOUT} label="团队名称" hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写名称!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="团队描述">
            {getFieldDecorator('description')(
              <Input.TextArea/>
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="加入口令">
            {getFieldDecorator('password')(
              <Input/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

TeamFormModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
TeamFormModal = Form.create()(TeamFormModal);
export default TeamFormModal;
