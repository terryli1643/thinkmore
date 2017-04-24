import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import moment from 'moment';

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

const checkTime = (rule, value, callback) => {
  const date = value ? value.valueOf() : "";
  if (date && date > Date.now()) {
    callback(new Error('请选择正确日期哟!'));
  } else {
    callback();
  }
};

class RecordSearch extends Component {

  getList = () => {
    const { getCourseList, location, form: { getFieldsValue } } = this.props;
    let searchField = getFieldsValue();
    if (searchField.name === undefined) {
      searchField.name = ""
    }
    searchField = {
      ...searchField,
      timeFrom: searchField.timeFrom === null ? null : searchField.timeFrom.format("YYYY-MM-DD"),
      timeTo: searchField.timeTo === null ? null : searchField.timeTo.format("YYYY-MM-DD")
    };
  };

  setFields = () => {
    const { form: { setFieldsValue }, location: { query } } = this.props;
    setFieldsValue({
      timeFrom: query.timeFrom ? moment(query.timeFrom) : null,
      timeTo: query.timeTo ? moment(query.timeTo) : null,
      keyword: query.keyword
    });
    this.getList();
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { location } = this.props;
        const payload = {
          ...values,
          timeFrom: values.timeFrom === null ? null : values.timeFrom.format("YYYY-MM-DD"),
          timeTo: values.timeTo === null ? null : values.timeTo.format("YYYY-MM-DD")
        };
        setTimeout(() => this.getList(), 0)
      }
    });
  };

  disabledStartDate = (startValue) => {
    const { form: { getFieldValue } } =  this.props;
    if (!startValue || !getFieldValue("timeTo")) {
      return false;
    }
    return startValue.valueOf() >= getFieldValue("timeTo").valueOf();
  };

  disabledEndDate = (endValue) => {
    const { form: { getFieldValue } } =  this.props;
    if (!endValue || !getFieldValue("timeFrom")) {
      return false;
    }
    return endValue.valueOf() <= getFieldValue("timeFrom").valueOf();
  };

  render = () => {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    };
    const formItemLayoutLast = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    const DatePickLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    };
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>
          <Col span={6}>
            <FormItem
              label="日期"
              {...DatePickLayout}
            >
              {
                getFieldDecorator("timeFrom", {
                  initialValue: null,
                  rules: [ {
                    validator: checkTime
                  } ]
                })(
                  <DatePicker size="large" disabledDate={this.disabledStartDate} />
                )
              }
            </FormItem>
          </Col>
          <Col span={1}>
            <p className="ant-form-split">-</p>
          </Col>
          <Col span={4}>
            <FormItem>
              {
                getFieldDecorator("timeTo", {
                  initialValue: null,
                  rules: [ {
                    validator: checkTime
                  } ]
                })(
                  <DatePicker size="large" disabledDate={this.disabledEndDate} />
                )
              }
            </FormItem>
          </Col>
          <Col span={9}>
            <FormItem {...formItemLayout} label="关键字">
              {getFieldDecorator(`name`, {
                initialValue: ""
              })(
                <Input placeholder="姓名，手机，订单号，快递单号" />
              )}
            </FormItem>
          </Col>
          <Col span={4} >
            <Button type="primary" htmlType="submit" size="large">查询</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default RecordSearch = createForm({})(RecordSearch);
