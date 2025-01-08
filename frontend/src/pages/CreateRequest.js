import React from 'react';
import { Form, Input, Button, Card, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

function CreateRequest() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/repair-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('維修需求已發布！');
        navigate('/requests');
      } else {
        message.error(data.error || '發布失敗');
      }
    } catch (error) {
      message.error('發布需求時發生錯誤');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <Card title="發布維修需求" bordered={false}>
        <Form
          name="createRequest"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="標題"
            name="title"
            rules={[{ required: true, message: '請輸入標題！' }]}
          >
            <Input placeholder="簡短描述您的維修需求" />
          </Form.Item>

          <Form.Item
            label="詳細描述"
            name="description"
            rules={[{ required: true, message: '請輸入詳細描述！' }]}
          >
            <TextArea rows={4} placeholder="詳細描述您的維修需求" />
          </Form.Item>

          <Form.Item
            label="地點"
            name="location"
            rules={[{ required: true, message: '請輸入地點！' }]}
          >
            <Input placeholder="輸入維修地點" />
          </Form.Item>

          <Form.Item
            label="維修類別"
            name="category"
            rules={[{ required: true, message: '請選擇維修類別！' }]}
          >
            <Select placeholder="選擇維修類別">
              <Select.Option value="plumbing">水電維修</Select.Option>
              <Select.Option value="electrical">電器維修</Select.Option>
              <Select.Option value="carpentry">木工維修</Select.Option>
              <Select.Option value="painting">油漆粉刷</Select.Option>
              <Select.Option value="appliance">家電維修</Select.Option>
              <Select.Option value="other">其他</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              發布需求
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default CreateRequest;
