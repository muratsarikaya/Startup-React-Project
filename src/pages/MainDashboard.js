import React from "react";
import styles from "../pages/admin/Common.module.css";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Layout, Statistic, Card, Row, Col } from "antd";
const { Content } = Layout;

function MainDashboard() {
  return (
    <>
      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <div className={styles.siteLayoutContent}>
            <div className={styles.siteStatisticDemoCard}>
              <Row gutter={16}>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Kullanıcılar"
                      value={11.28}
                      precision={2}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<ArrowUpOutlined />}
                      suffix="%"
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Yorumlar"
                      value={9.3}
                      precision={2}
                      valueStyle={{ color: "#cf1322" }}
                      prefix={<ArrowDownOutlined />}
                      suffix="%"
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Trafik"
                      value={9.3}
                      precision={2}
                      valueStyle={{ color: "#cf1322" }}
                      prefix={<ArrowDownOutlined />}
                      suffix="%"
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default MainDashboard;
