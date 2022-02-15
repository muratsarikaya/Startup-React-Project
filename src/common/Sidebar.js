import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  FileAddOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const Sidebar = () => {
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <>
      <Menu
        mode="inline"
        //openKeys={openKeys}
        defaultSelectedKeys={["1"]}
        onOpenChange={onOpenChange}
        style={{ width: 256 }}
      >
        <Menu.Item icon={<AppstoreOutlined />} key="1">
          <Link to="/dashboard" style={{textDecoration: 'none'}} >Dashboard</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Ürünler">
        <Menu.Item key="2"><Link to="/dashboard/product/categories" style={{textDecoration: 'none'}}>Kategoriler</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/dashboard/product/category/new" style={{textDecoration: 'none'}}>Yeni Kategori Ekle</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/dashboard/products" style={{textDecoration: 'none'}}>Ürün Listesi</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/dashboard/product/new" style={{textDecoration: 'none'}}>Yeni Ürün Ekle</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<MailOutlined />} title="Mesajlar">
          <Menu.Item key="6">Gelen Mesajlar</Menu.Item>
          <Menu.Item key="7">Yeni Mesaj</Menu.Item>
        </SubMenu>
        <Menu.Item icon={<FileAddOutlined />} key="8">
          <Link to="/dashboard" style={{textDecoration: 'none'}} >Dosya Yöneticisi</Link>
        </Menu.Item>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Ayarlar">
          <Menu.Item key="9">Kullanıcılar</Menu.Item>
          <Menu.Item key="10">Tema</Menu.Item>
          <Menu.Item key="11">Site</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};

export default Sidebar;
