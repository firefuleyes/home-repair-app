import React from 'react';
import { Typography, Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ToolOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function Home() {
  return (
    <div>
      <Title level={1} style={{ textAlign: 'center', marginBottom: 40 }}>
        歡迎使用房屋修繕服務平台
      </Title>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            style={{ textAlign: 'center' }}
            cover={<ToolOutlined style={{ fontSize: 48, marginTop: 24 }} />}
          >
            <Title level={3}>我需要維修服務</Title>
            <Paragraph>
              快速發布維修需求，找到專業師傅
            </Paragraph>
            <Link to="/create-request">
              <Button type="primary" size="large">
                發布需求
              </Button>
            </Link>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            style={{ textAlign: 'center' }}
            cover={<UserOutlined style={{ fontSize: 48, marginTop: 24 }} />}
          >
            <Title level={3}>我是維修師傅</Title>
            <Paragraph>
              瀏覽維修需求，接單賺取收入
            </Paragraph>
            <Link to="/requests">
              <Button type="primary" size="large">
                查看需求
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
