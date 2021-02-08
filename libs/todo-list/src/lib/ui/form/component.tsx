import React from 'react';
import { Form, Input, Button } from 'antd';
import { IPropsTodoForm } from './types';

export const TodoForm: React.FC<IPropsTodoForm> = ({ todoListPresenter }) => (
  <Form
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    name="basic"
    initialValues={{ remember: true }}
    onFinish={todoListPresenter.create}
  >
    <Form.Item
      label="Title"
      name="title"
      rules={[{ required: true, message: 'Please input your title!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Description"
      name="description"
    >
      <Input.TextArea />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" loading={todoListPresenter.isCreateLoading}>
        Create
      </Button>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button onClick={todoListPresenter.createCurrency}>
        Create Currency
      </Button>
    </Form.Item>
  </Form>
);
