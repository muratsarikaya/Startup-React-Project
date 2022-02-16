import React, {useEffect} from "react";
import "antd/dist/antd.css";
import { Link, Redirect } from "react-router-dom";
import {
  ArrowRightOutlined,
  UserOutlined,
  PlusOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, message, Space, Button } from "antd";

import { useAuth } from "../../contextApi/AuthContext";
import {useBasket} from "../../contextApi/BasketContext";
const { Header } = Layout;

function handleMenuClick(e) {
  // message.info("Click on menu item.");
  console.log("click", e);
}

const menuItem = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<ArrowRightOutlined />}>
      <Link to="/sign-in">Giriş Yap</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<PlusOutlined />}>
      <Link to="/sign-up">Kaydol</Link>
    </Menu.Item>
  </Menu>
);
const AuthActiveMenuItem = (logout) => (
  <Menu>
    <Menu.Item key="1" icon={<DashboardOutlined />}>
      <Link to="/dashboard">Dashboard</Link>
    </Menu.Item>
    <Menu.Item onClick={logout} key="2" icon={<ArrowRightOutlined />}>
      Çıkış Yap
    </Menu.Item>
  </Menu>
);
const menu = (
  <Menu>
    <Menu.Item>
        <Link to="/cart">
            Sepete Git
        </Link>
    </Menu.Item>
  </Menu>
);
const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const {basket} = useBasket();

  useEffect(()=>{
  },[basket]);
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "100%" }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/" style={{ textDecoration: "none" }}>
                Anasayfa
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/about" style={{ textDecoration: "none" }}>
                Hakkımızda
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/product-list" style={{ textDecoration: "none" }}>
                Ürünlerimiz
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <Space wrap style={{ width: "38%" }}>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button> Sepet ({basket.length})
              <ShoppingCartOutlined style={{fontSize:"18px"}} />
            </Button>
          </Dropdown>
          <Dropdown.Button
            overlay={currentUser ? AuthActiveMenuItem(logout) : menuItem}
            placement="bottomCenter"
            icon={<UserOutlined />}
          >
            {currentUser ? currentUser.email : "Hesabım"}
          </Dropdown.Button>
        </Space>
      </Header>
    </Layout>
  );
};

export default Navbar;
