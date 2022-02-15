import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Spin, message } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "../../contextApi/AuthContext";

function LoginForm() {
  const [loaderButton, setLoaderButton] = useState(false);

  const history = useHistory();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { login } = useAuth();

  const submitForm = async (values) => {
    setLoaderButton(true);
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      await login(data.email, data.password);
      message.success("Başarı bir şekilde giriş yapıldı..")
      setTimeout(() => {
        history.push("/dashboard");
        setLoaderButton(false);
      }, 2000);
    } catch (err) {
      err.code === "auth/user-not-found"
        ? message.error(
            `${data.email} olarak kayıtlı bir e-posta adresi bulunamadı.`
          )
        : console.log(err);
      setLoaderButton(false);
    }
  };

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={submitForm}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Lütfen E-Posta Adresini Giriniz!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="E-Posta"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Lütfen Kullanıcı Parola Giriniz!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Parola"
          />
        </Form.Item>
        <Form.Item>
          {loaderButton === true ? (
            <Spin indicator={antIcon} />
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Giriş
            </Button>
          )}
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Beni Hatırla</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Parolamı Unuttum
          </a>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginForm;
