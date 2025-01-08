import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

function Navbar() {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">首頁</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/create-request">發布需求</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/requests">維修需求列表</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/login">登入</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navbar;
