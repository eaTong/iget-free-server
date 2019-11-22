/**
 * Created by eaTong on 2019-11-21 .
 * Description: auto generated in  2019-11-21
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message, Radio} from 'antd';
import {GLOBAL_LAYOUT} from '~/utils/constants';
import AsyncSelect from "../../components/AsyncSelect";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class BookMarkFormModal extends Component {
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
          <FormItem label={'文章'} className={'line'} {...GLOBAL_LAYOUT}>
            {getFieldDecorator('bookId', {rules: [{required: true, message: '请选择文章'}]})(
              <AsyncSelect placeholder={'文章'} asyncUrl={'/api/book/get'}/>
            )}
          </FormItem>
          <FormItem label={'标记为'} className={'line'} {...GLOBAL_LAYOUT}>
            {getFieldDecorator('status', {initialValue: 0})(
              <RadioGroup>
                <Radio value={0}>未读</Radio>
                <Radio value={1}>想读</Radio>
                <Radio value={2}>在读</Radio>
                <Radio value={3}>已读</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

BookMarkFormModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
BookMarkFormModal = Form.create()(BookMarkFormModal);
export default BookMarkFormModal;
