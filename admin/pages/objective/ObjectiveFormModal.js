/**
 * Created by eaTong on 2020-01-10 .
 * Description: auto generated in  2020-01-10
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Form, Input, message, Switch, DatePicker, Cascader} from 'antd';
import {GLOBAL_LAYOUT} from '~/utils/constants';
import ajax from "../../utils/ajax";
import moment from "moment";

const FormItem = Form.Item;

class ObjectiveFormModal extends Component {
  state = {
    teams: []
  };

  componentDidMount() {
    this.getTeamWithUsers();
    if (/(edit)|(copyAdd)/.test(this.props.operateType)) {
      const {formData} = this.props;
      console.log(formData, moment(formData.planStartDate).format('YYYY-MM-DD HH:mm:SS'));
      this.props.form.setFieldsValue({
        ...formData,
        planEndDate: moment(formData.planEndDate),
        planStartDate: moment(formData.planStartDate)
      });
    }
  }

  async getTeamWithUsers() {
    const teams = await ajax({url: '/api/team/get/withUser'});
    this.setState({teams});
  }


  onSaveData() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      if (values.responsible && values.responsible.length > 0) {

        values.responsibleUserId = values.responsible[1];
        values.responsibleTeamId = values.responsible[0];
      }
      this.props.onOk && this.props.onOk(values);
    });
  }

  render() {
    const {operateType} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;
    return (
      <Modal title={(operateType === 'add' ? '新增' : '编辑') + '目标'}
             maskClosable={false}
             visible={true} onOk={this.onSaveData.bind(this)} onCancel={this.props.onCancel}>
        <Form>
          <FormItem {...GLOBAL_LAYOUT} label="名称" hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请填写名称!',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="备注">
            {getFieldDecorator('description')(
              <Input.TextArea/>
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="个人使用">
            {getFieldDecorator('selfUse', {initialValue: true, valuePropName: 'checked'})(
              <Switch/>
            )}
          </FormItem>

          <FormItem {...GLOBAL_LAYOUT} label="计划开始日期">
            {getFieldDecorator('planStartDate')(
              <DatePicker placeholder={'计划开始日期'}/>
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="计划结束日期">
            {getFieldDecorator('planEndDate')(
              <DatePicker placeholder={'计划结束日期'}/>
            )}
          </FormItem>
          {!getFieldValue('selfUse') && (

            <FormItem {...GLOBAL_LAYOUT} label="负责人">
              {getFieldDecorator('responsible', {initialValue: true, valuePropName: 'checked'})(
                <Cascader options={this.state.teams} fieldNames={{label: 'name', value: 'id', children: 'users'}}/>
              )}
            </FormItem>
          )}
          <FormItem {...GLOBAL_LAYOUT} label="完成奖励">
            {getFieldDecorator('reward')(
              <Input.TextArea/>
            )}
          </FormItem>
          <FormItem {...GLOBAL_LAYOUT} label="奖励已发放">
            {getFieldDecorator('rewarded', {initialValue: false, valuePropName: 'checked'})(
              <Switch checkedChildren={'是'} unCheckedChildren={'否'}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

ObjectiveFormModal.propTypes = {
  operateType: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  formData: PropTypes.object
};
ObjectiveFormModal = Form.create()(ObjectiveFormModal);
export default ObjectiveFormModal;
