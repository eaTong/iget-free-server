/**
 * Created by eaTong on 2019-11-23 .
 * Description: auto generated in  2019-11-23
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message} from 'antd';
import {GLOBAL_LAYOUT} from '~/utils/constants';
import AsyncSelect from "../../components/AsyncSelect";
import ImageUploader from "../../components/ImageUploader";

const FormItem = Form.Item;

class BookNoteFormModal extends Component {
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
            label="关联书籍"
            hasFeedback>
            {getFieldDecorator('bookId', {
              rules: [{
                required: true, message: '请填写关联书籍!',
              }],
            })(
              <AsyncSelect asyncUrl={'/api/book/get'}/>
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="笔记内容">
            {getFieldDecorator('content')(
              <Input.TextArea
                autoSize={{minRows: 3}}
                placeholder={'笔记内容'}
              />
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="引用">
            {getFieldDecorator('reference')(
              <Input.TextArea
                autoSize={{minRows: 3}}
                placeholder={'引用'}
              />
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="图片上传">
            {getFieldDecorator('images')(
              <ImageUploader/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

BookNoteFormModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
BookNoteFormModal = Form.create()(BookNoteFormModal);
export default BookNoteFormModal;
