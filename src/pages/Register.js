import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Breadcrumb } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import RegistrationForm from "../components/form/RegistrationForm";
import { Layout } from "antd";
const { Content } = Layout;

function Register() {

  return (
    <Content>
      <Container>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item href="/">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <UserOutlined />
                <span>Hesabım</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Kaydol</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row className="mt-5 mb-4">
          <Col xs="12">
            <h1>Kaydol</h1>
            <p>
              Lorem İpsumLorem Ipsum, dizgi ve baskı endüstrisinde kullanılan
              mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir
              hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak
              karıştırdığı 1500'lerden beri endüstri standardı sahte metinler
              olarak kullanılmıştır. Beşyüz yıl boyunca varlığın
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={{ offset: 4, size: 4 }}>
            <RegistrationForm />
          </Col>
        </Row>
      </Container>
    </Content>
  );
}

export default Register;