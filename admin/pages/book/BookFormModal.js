/**
 * Created by eaTong on 2019-11-20 .
 * Description: auto generated in  2019-11-20
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message, DatePicker, InputNumber} from 'antd';
import {GLOBAL_LAYOUT} from '~/utils/constants';

const FormItem = Form.Item;

class BookFormModal extends Component {
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
          <FormItem {...GLOBAL_LAYOUT} label="名称" >
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请填写名称!',}],
            })(
              <Input placeholder={'请输入标题'}/>
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="副标题" >
            {getFieldDecorator('subTitle')(
              <Input/>
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="字数" >
            {getFieldDecorator('letterCount', {
              rules: [{required: true, message: '请填写字数!',}],
            })(
              <Input type={'number'} addonAfter={'万字'}/>
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="出版日期" >
            {getFieldDecorator('publishDate')(
              <DatePicker/>
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="出版方" >
            {getFieldDecorator('publisher')(
              <Input/>
            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}

BookFormModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
BookFormModal = Form.create()(BookFormModal);
export default BookFormModal;
