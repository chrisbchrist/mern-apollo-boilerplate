import React, {useState, MouseEvent, FunctionComponent} from 'react';
import {Layout, Menu, Icon, Button, Dropdown} from 'antd';
import {Link} from 'react-router-dom';

const {Header, Content, Footer} = Layout;
const {SubMenu} = Menu;

import '../styles/styles.css';

interface NavbarProps {
    authUser: any,
    setAuthUser: any
}

const Navbar: FunctionComponent<NavbarProps> = ({authUser, setAuthUser}) => {
    const [current, setCurrent] = useState('mail');

    const handleClick = (e: any) => {
        setCurrent(e.key);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthUser(null);
    };

    const menu = (
        <Menu>
            <Menu.Item>
                <a>
                    <Icon type="logout"/> Log out
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    2nd menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                    3rd menu item
                </a>
            </Menu.Item>
        </Menu>
    );

    const avatar = authUser ? (<Dropdown overlay={menu}>
        <div className="avatar"><Icon style={{color: "#aaa"}} className="avatar__icon" type="user"/></div>
    </Dropdown>) : (<Link to="/register">
        <Button
            type="primary"
            icon="user-add"
            size="large"
            style={{marginLeft: 15}}
        >
            Sign Up!
        </Button>
    </Link>);

    const login = authUser ? (<a onClick={handleLogout}>
        <Icon type="logout"/> Sign Out
    </a>) : (<Link to="/login">
        <Icon type="lock"/> Log in
    </Link>);

    return (
        <Header
            style={{
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Link to="/">
                <div className="logo">
                    <Icon
                        type="folder-add"
                        style={{fontSize: 32, color: 'rgb(0,123,255)', marginRight: 10}}
                    />
                    <span className="logo__text">Kwikfolio</span>
                </div>
            </Link>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[]}
                style={{lineHeight: '64px', marginLeft: 'auto'}}
            >
                <Menu.Item className="nav-item" key="2">
                    {login}
                </Menu.Item>
                <Menu.Item className="nav-item" key="1">
                    <Link to="/editor">
                    <Icon type="edit"/> Editor
                    </Link>
                </Menu.Item>
            </Menu>
            {avatar}
        </Header>
    );
};

export default Navbar;
