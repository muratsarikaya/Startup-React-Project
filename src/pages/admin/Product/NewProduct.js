import React from "react";
import CreateProductForm from "../../../components/form/CreateProductForm";
import HeaderPage from "../../../components/header/HeaderPage";
import styles from "../../../pages/admin/Common.module.css"
import { Layout} from "antd";
const { Content } = Layout;

const NewProduct = () => {
  return (
    <>
      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <div className={styles.siteLayoutContent}>
          <HeaderPage pageTitle="Ürün Ekle" />
            <CreateProductForm />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default NewProduct;
