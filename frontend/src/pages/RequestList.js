import React, { useEffect, useState } from 'react';
import { List, Card, Tag, Button, message } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

function RequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/repair-requests');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      message.error('獲取維修需求列表失敗');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      plumbing: 'blue',
      electrical: 'red',
      carpentry: 'orange',
      painting: 'green',
      appliance: 'purple',
      other: 'default'
    };
    return colors[category] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'orange',
      accepted: 'green',
      completed: 'blue',
      cancelled: 'red'
    };
    return colors[status] || 'default';
  };

  const getCategoryText = (category) => {
    const texts = {
      plumbing: '水電維修',
      electrical: '電器維修',
      carpentry: '木工維修',
      painting: '油漆粉刷',
      appliance: '家電維修',
      other: '其他'
    };
    return texts[category] || category;
  };

  return (
    <div style={{ padding: '24px' }}>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
        dataSource={requests}
        renderItem={item => (
          <List.Item>
            <Card
              title={item.title}
              extra={<Tag color={getStatusColor(item.status)}>{item.status}</Tag>}
            >
              <p>{item.description}</p>
              <p>
                <EnvironmentOutlined /> {item.location}
              </p>
              <p>
                <ClockCircleOutlined /> {new Date(item.created_at).toLocaleString()}
              </p>
              <div>
                <Tag color={getCategoryColor(item.category)}>
                  {getCategoryText(item.category)}
                </Tag>
              </div>
              <Button 
                type="primary" 
                style={{ marginTop: 16 }}
                onClick={() => message.info('聯繫功能開發中')}
              >
                <PhoneOutlined /> 聯繫業主
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default RequestList;
