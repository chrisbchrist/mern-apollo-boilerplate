import React, {useState, MouseEvent, FunctionComponent, useEffect} from "react";
import {
  Layout,
  Menu,
  Icon,
  Button,
  Dropdown,
  Popconfirm,
  message
} from "antd";
import {Link, RouteComponentProps} from "react-router-dom";
import { withRouter } from "react-router-dom";
import "../styles/styles.css";

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

interface NavbarProps {
  authUser: any;
  setAuthUser: any;
}

const NavbarComponent: FunctionComponent<NavbarProps & RouteComponentProps> = ({ authUser, setAuthUser, ...otherProps }) => {
  const [current, setCurrent] = useState("mail");

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  useEffect(() => {
     console.log(otherProps.location.pathname);
  }, [otherProps.location]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setAuthUser(null);
    otherProps.history.push('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>
        <a>
          <Icon type="logout" /> Log out
        </a>
      </Menu.Item>
        <Menu.Item onClick={handleLogout}>
            <a>
                <Icon type="user" /> Profile
            </a>
        </Menu.Item>
    </Menu>
  );


  const avatar = authUser ? (
    <Dropdown overlay={userMenu}>
      <div className="avatar">
        <Icon style={{ color: "#aaa" }} className="avatar__icon" type="user" />
      </div>
    </Dropdown>
  ) : (
    <Link to="/register">
      <Button
        type="primary"
        icon="user-add"
        size="large"
        style={{ marginLeft: 15 }}
      >
        Sign Up!
      </Button>
    </Link>
  );

  const login = authUser ? (
    <Popconfirm
      title="Are you sure you want to log out?"
      onConfirm={handleLogout}
      okText="Yes"
      cancelText="No"
    >
      <a>
        <Icon type="logout" /> Sign Out
      </a>
    </Popconfirm>
  ) : (
    <Link to="/login">
      <Icon type="lock" /> Log in
    </Link>
  );

  return (
    <Header
      style={{
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
          borderBottom: "1px solid #ccc",
          background: "#fff"
      }}
    >
      <Link to="/">
        <div className="logo">
          <Icon
            type="folder-add"
            style={{ fontSize: 32, color: "rgb(0,123,255)", marginRight: 10 }}
          />
          <span className="logo__text">Kwikfolio</span>
        </div>
      </Link>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={[]}
        style={{ lineHeight: "61px", marginLeft: "auto" }}
      >
          <Menu.Item className="nav-item" key="1">
              <Link to="/"><Icon type="info-circle"/> About</Link>
          </Menu.Item>

        <Menu.Item className="nav-item" key="2">
          <Link to="/editor">
            <Icon type="edit" /> Editor
          </Link>
        </Menu.Item>

          <Menu.Item className="nav-item" key={authUser ? null : "3"}>
              {login}
          </Menu.Item>
      </Menu>
      {avatar}
    </Header>
  );
};

export default withRouter(NavbarComponent);
