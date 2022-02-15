import React from "react";
import { Layout, Row, Col, Tabs, Rate, Button, Menu, Dropdown } from "antd";
import ImageGallery from "react-image-gallery";
import { useProduct } from "../contextApi/ProductContext";
import { useParams } from "react-router-dom";

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const ProductDetail = () => {
  const { productList } = useProduct();
  const { productId } = useParams();

  const currentProduct =
    productList && productList.filter((product) => product.key === productId);

  const images =
    currentProduct &&
    currentProduct[0].image_list.map((img) => ({
      original: img,
      thumbnail: img,
    }));

  const onChangeRate = () => {};
  console.log();
  return (
    <Layout>
      {currentProduct ? (
        <Row wrap={false} style={{ marginTop: "60px" }}>
          <Col xs={8} offset={3} flex={"auto"}>
            <div
              className={"site-layout-background"}
              style={{ background: "#f0f2f5", padding: "10px 20px" }}
            >
              <ImageGallery items={images}></ImageGallery>
            </div>
          </Col>
          <Col xs={8} offset={1}>
            <div>
              <Button type="primary" size={"middle"}>
                Primary
              </Button>
            </div>
            <h1 style={{ margin: "50px 0" }}>
              {currentProduct[0].product_name}
            </h1>
            <div style={{ margin: "20px 0" }}>
              <Rate tooltips={desc} onChange={onChangeRate} value={3} />
              {3 ? <span className="ant-rate-text">{desc[3 - 1]}</span> : ""}
            </div>
            <div>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Bilgi" key="1">
                  {currentProduct[0].product_context}
                </TabPane>
                <TabPane tab="Marka" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Kargo" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <div style={{ fontSize: "24px" }}>
                Fiyat: {currentProduct[0].price} ₺
              </div>
              <Button type="primary" size={"middle"}>
                Şimdi Al
              </Button>
              <Button
                type="primary"
                size={"middle"}
                style={{ background: "#001529" }}
              >
                Sepete Ekle
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <div></div>
      )}
    </Layout>
  );
};

export default ProductDetail;
