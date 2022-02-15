import React, { useEffect } from "react";
import { Button, Table, Space, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import SearchFilterForm from "../../../components/form/SearchFilterForm";
import AcceptMessage from "../../../components/messages/AcceptMessage";
import { useProduct } from "../../../contextApi/ProductContext";
import HeaderPage from "../../../components/header/HeaderPage";
import styles from "../../../pages/admin/Common.module.css";
import { Link } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;

/* const data = [
  {
    key: "1",
    product_name: "John Brown",
    available: 32,
    price: "400",
    product_context: "Lorem İpsum",
  },
  {
    key: "2",
    product_name: "Jim Green",
    available: 42,
    price: "550",
    product_context: "Lorem İpsum",
  },
  {
    key: "3",
    product_name: "Joe Black",
    available: 32,
    price: "770",
    product_context: "Lorem İpsum",
  },
]; */

const ProductsList = () => {
  const { productList, deleteProduct } = useProduct();
  const deleteProductHandle = (id) => {
    deleteProduct(id);
    message.success("Ürün Başarı olarak silindi");
  };

  const columns = [
    {
      title: "Ürün Kategorisi",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Ürün Adı",
      dataIndex: "product_name",
      key: "product_name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Adet",
      dataIndex: "available",
      key: "available",
    },
    {
      title: "Fiyat (TL)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ürün Açıklması",
      key: "product_context",
      dataIndex: "product_context",
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
            }}
          >
            <Link
              to={`/dashboard/product/${record.key}`}
              style={{ textDecoration: "none", color: "#fff" }}
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
    console.log("productlist çalıştı");
    //getProducts(); bunu yeni kaldırdım.
  }, []);

  return (
    <>
      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <div className={styles.siteLayoutContent}>
            <HeaderPage pageTitle="Ürün Listesi" />
            <SearchFilterForm />
            <Table columns={columns} dataSource={productList} />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default ProductsList;
