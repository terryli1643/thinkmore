import PropTypes from 'prop-types'
import { Form, Input, Button, Row, Col, InputNumber, Radio, Modal } from 'antd'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
}

const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 10 },
};

const RecordForm = ({
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
  },
  item = {},
}) => {

  const handleReset = () => {
    resetFields();
  }

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  return (
    <Form layout="horizontal">
      <h2>发件人信息</h2>
      <FormItem label="姓名：" hasFeedback {...formItemLayout}>
        {getFieldDecorator('senderName', {
          initialValue: item.senderName,
          rules: [
            {
              required: true,
              message: '姓名未填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="电话：" hasFeedback {...formItemLayout}>
        {getFieldDecorator('senderMobile', {
          initialValue: item.senderMobile,
          rules: [
            {
              required: true,
              message: '电话未填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="单位" hasFeedback {...formItemLayout}>
        {getFieldDecorator('senderCompany', {
          initialValue: item.senderCompany,
          rules: [
            {
              required: true,
              message: '单位未填写',
            },
          ],
        })(
          <Input />
        )}
      </FormItem>
      <FormItem label="地址：" hasFeedback {...formItemLayout}>
        {getFieldDecorator('senderAddress', {
          initialValue: item.senderAddress,
          rules: [
            {
              required: true,
              message: '地址未填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <h2>收件人信息</h2>
      <FormItem label="姓名：" hasFeedback {...formItemLayout}>
        {getFieldDecorator('receiverName', {
          initialValue: item.senderName,
          rules: [
            {
              required: true,
              message: '姓名未填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="电话：" hasFeedback {...formItemLayout}>
        {getFieldDecorator('receiverMobile', {
          initialValue: item.senderMobile,
          rules: [
            {
              required: true,
              message: '电话未填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="单位" hasFeedback {...formItemLayout}>
        {getFieldDecorator('receiverCompany', {
          initialValue: item.receiverCompany,
          rules: [
            {
              required: true,
              message: '单位未填写',
            },
          ],
        })(
          <Input />
        )}
      </FormItem>
      <FormItem label="地址：" hasFeedback {...formItemLayout}>
        {getFieldDecorator('receiverAddress', {
          initialValue: item.receiverAddress,
          rules: [
            {
              required: true,
              message: '地址未填写',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...buttonItemLayout}>
        <Button type="primary" htmlType="submit" size="large" onClick={handleOk}>提交</Button>
        <Button style={{ marginLeft: 8 }} onClick={handleReset}>清空</Button>
      </FormItem>
    </Form>
  )
}

RecordForm.propTypes = {
  form: PropTypes.object.isRequired,
  item: PropTypes.object,
}

export default Form.create()(RecordForm)
