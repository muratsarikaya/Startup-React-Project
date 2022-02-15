import React, {useEffect}from "react";
import { Layout, Row, Col } from "antd";
import styles from "../pages/admin/Common.module.css"
import ProductFilterForm from "../components/form/ProductFilterForm";
import SummaryProduct from "../components/main/SummaryProduct";



const { Sider, Content } = Layout;

const ProductListPage = () => {

  return (
    <Layout>
      <Row wrap={false}>
        <Col flex={"none"}>
          <div
            className={"site-layout-background"}
            style={{ background: "#f0f2f5", padding: "10px 20px" }}
          >
            <ProductFilterForm />
          </div>
        </Col>
        <Col flex="auto">
        <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <div className={styles.siteLayoutContent}>
        <Row>
            <SummaryProduct />
        </Row>
        </div>
      </Content>
    </Layout>
        </Col>
      </Row>
    </Layout>
  );
};

export default ProductListPage;
