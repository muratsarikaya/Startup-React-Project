import React from "react";
import { Container, Row, Col } from "reactstrap";
import LoginForm from "../components/form/LoginForm";
import { Layout } from "antd";
import Logo from "../img/testLogom.png"
const { Content } = Layout;

//import { auth, provider } from "../firebaseApi";

function Login() {

  return (
    <Content>
      <Container>
        <Row className="mt-5 mb-4"> 
        <Col xs={12}><img src={Logo}/></Col>
          <Col xs="12">
            <h1>Giriş Yap</h1>
           
          </Col>
        </Row>
        <Row>
          
          <Col xs={{ offset: 4, size: 4 }}>
            <LoginForm/>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}

export default Login;