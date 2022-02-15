import React, { useEffect } from "react";
import { Button, Table, Space, message, Badge } from "antd";
import { EditOutlined } from "@ant-design/icons";
import SearchFilterForm from "../../../components/form/SearchFilterForm";
import AcceptMessage from "../../../components/messages/AcceptMessage";
import { useCategory } from "../../../contextApi/CategoryContext";
import HeaderPage from "../../../components/header/HeaderPage";
import styles from "../../../pages/admin/Common.module.css";
import { Link } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;


const CategoryList = () => {
  const { categoryList, deleteCategory, getCategories } = useCategory();

  const deleteProductHandle = (id) => {
    deleteCategory(id);
    message.success("Ürün Başarı olarak silindi");
  };

  const columns = [
    {
      title: "Kategori Adı",
      dataIndex: "category_name",
      key: "category_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Kategori Açıklması",
      key: "category_context",
      dataIndex: "category_context",
    },
    {
      title: "Üst Kategori",
      dataIndex: "category_parent_name",
      key: "category_parent_name",
    },
    {
      title: "Durum",
      dataIndex: "category_is_active",
      key: "category_is_active",
      render:(text, record)=>(
        <>
        {
          record.category_is_active === true
          ? <Badge count={"Aktif"} style={{ backgroundColor: '#52c41a', padding:"6px 12px", height: "auto"}}/>
          : <Badge count={"Pasif"} style={{ backgroundColor: '#ff4d4f', padding:"6px 12px", height: "auto"}}/>
        }
        
        </>
      )
    },
    {
      title: "Olay",
      key: "olay",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{
              backgroundColor: "#52c41a",
              borderColor: "#b7eb8f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Link
              to={`/dashboard/product/category/${record.key}`}
              style={{ textDecoration: "none", color: "#fff", lineHeight: "6px" }}
            >
              <EditOutlined />
            </Link>
          </Button>
          <AcceptMessage
            productId={record.key}
            deleteHandle={deleteProductHandle}
          ></AcceptMessage>
        </Space>
      ),
    },
  ];

  // console.log(products);
  useEffect(() => {
    getCategories();
    console.log("productlist çalıştı");
  }, []);
  console.log(categoryList)
  return (
    <>
      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <div className={styles.siteLayoutContent}>
            <HeaderPage pageTitle="Ürün Listesi" />
            <SearchFilterForm />
            <Table columns={columns} dataSource={categoryList} />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default CategoryList;