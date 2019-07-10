import React, { useState, MouseEvent, FunctionComponent } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const { SubMenu } = Menu;

import '../styles/styles.css';

interface NavbarState {
  current: string;
}

const Navbar: FunctionComponent<{}> = () => {
  const [current, setCurrent] = useState('mail');

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  const logo = (
    <div className="logo">
      <Icon
        type="folder-add"
        style={{ fontSize: 22, color: 'rgb(0,123,255)', marginRight: 10 }}
      />
      <span className="logo__text">Kwikfolio</span>
    </div>
  );

  return (
    <Header
      style={{
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {logo}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px', marginLeft: 'auto' }}
      >
        <Menu.Item key="2">
          <Link to="/login">
            <Icon type="lock" /> Log in
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Icon type="info-circle" /> About
        </Menu.Item>
      </Menu>
      <Button
        type="primary"
        icon="user-add"
        size="large"
        style={{ marginLeft: 10 }}
      >
        Sign Up!
      </Button>
    </Header>
  );
};

export default Navbar;
