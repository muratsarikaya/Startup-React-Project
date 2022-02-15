import React from "react";
import { Layout } from "antd";
import MainCarousel from "../components/header/MainCarousel";
import SummaryProduct from "../components/main/SummaryProduct";
import { Container, Row, Col } from "reactstrap";
const { Content } = Layout;

function Home() {
  return (
    <Content>
      <MainCarousel />
      <Container>
        <Row className="mt-5 mb-4">
          <Col xs="12">
            <h1>Ürün Listesi</h1>
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
            <SummaryProduct />
        </Row>
      </Container>
    </Content>
  );
}

export default Home;
