import React, { useState, useEffect } from "react";
import { useProduct } from "../../contextApi/ProductContext";
import { useCategory } from "../../contextApi/CategoryContext";
import { useParams, useHistory } from "react-router-dom";
import { Form, Input, InputNumber, Button, message, Spin, Space } from "antd";
import { Row, Col, Select } from "antd";
import { LoadingOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "../../pages/admin/Common.module.css"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} zorunludur!",
  types: {
    email: "${label} geçersiz bir email adresi!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const { TextArea } = Input;

const CreateProductForm = () => {
  const [loaderButton, setLoaderButton] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [form] = Form.useForm();
  const { sendProduct, updateProduct, productList, productHandle } =
    useProduct();
  const { categoryList } = useCategory();
  const { productId } = useParams();
  const history = useHistory();
  const options = [];

  if (categoryList) {
    for (let i = 0; i < categoryList.length; i++) {
      let value = categoryList[i].category_name;
      console.log(value);
      options.push({
        value,
      });
    }
  }

  const saveForm = (values) => {
    console.log(values);
    const data = {
      category_name: values.category_name,
      product_name: values.product_name,
      product_context: values.product_context,
      available: values.available,
      price: values.price,
      image_url: values.image_url,
      image_list : values.image_list
    };
    try {
      sendProduct(data);
      message.success("Başarı olarak kaydedildi.");
      history.push("/dashboard/products");
      form.resetFields();
    } catch (err) {
      message.error("Kaydetme işlemi başarısız oldu.");
    }
  };

  const updateForm = (values) => {
    console.log(currentProduct);
    const data = {
      category_name: values.category_name,
      product_name: values.product_name,
      product_context: values.product_context,
      available: values.available,
      price: values.price,
      image_url: values.image_url,
    };

    try {
      updateProduct(currentProduct[0].key, data);
      history.push("/dashboard/products");
      message.success("Başarı olarak güncellendi.");
    } catch (err) {
      message.error("Kaydetme işlemi başarısız oldu.");
    }
  };

  const setProductFrom = () => {
    console.log("setting field value");

    if (currentProduct) {
      form.setFieldsValue({
        category_name: currentProduct[0].category_name,
        product_name: currentProduct[0].product_name,
        product_context: currentProduct[0].product_context,
        image_url: currentProduct[0].image_url,
        image_list: currentProduct[0].image_list.map(img => img),
        available: currentProduct[0].available,
        price: currentProduct[0].price,
      });
    } else {
      form.setFieldsValue({
        category_name: [],
        product_name: "",
        product_context: "",
        image_url: "",
        available: "",
        price: "",
      });
    }
  };
  const setIsParams = () => {
    if (productId) {
      const currentProduct =
        productList &&
        productList.filter((product) => product.key === productId);
      return currentProduct;
    } else {
      return false;
    }
  };

  const currentProduct =
    productList && productList.filter((product) => product.key === productId);
  if (productId !== "new") {
    currentProduct && setProductFrom();
  } else {
    form.setFieldsValue({
      category_name: [],
      product_name: "",
      product_context: "",
      image_url: "",
      available: "",
      price: "",
    });
  }
  //currentProduct && setProductFrom();
  useEffect(() => {
    //getProducts();
    console.log("createForm Çalıştı");
  }, []);

  return (
    <>
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={currentProduct && productId !== "new" ? updateForm : saveForm}
        validateMessages={validateMessages}
      >
        <Row>
          <Col span={12} offset={2}>
            <Form.Item
              name={["category_name"]}
              label="Ürün Kategorisi"
              rules={[
                {
                  required: true,
                  type: "array",
                },
              ]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Seçiniz"
                defaultValue={[]}
                options={options}
              />
            </Form.Item>
            <Form.Item
              name={["product_name"]}
              label="Ürün Adı"
              rules={[{ required: true }]}
            >
              <Input style={{ textAlign: "left" }} />
            </Form.Item>
            <Form.Item
              name={["product_context"]}
              label="Ürün Açıklaması"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name={["image_url"]}
              label="Resim Adresi"
              rules={[{ required: true }]}
            >
              <Input style={{ textAlign: "left" }} />
            </Form.Item>
            <Form.Item
              name={["available"]}
              label="Adet"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>

            <Form.Item
              name={["price"]}
              label="Fiyat"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.List name={['image_list']} label="Resim Adresi">
              {(image_list, { add, remove }) => (
                <>
                  {image_list.map(({ key, name, ...restField }) => (
                    <Space
                     className={styles.inputWidthIncreased}
                      key={key}
                      style={{ display: "flex", marginBottom: 8, justifyContent:"right"}}
                      align="baseline"
                    >
                      <Form.Item style={{textAlign:"center", width:"100%",justifyContent:"end"}}
                        {...restField}
                        name={[name]}
                        rules={[
                          { required: true, message: "Missing first name" },
                        ]}
                      >
                        <Input placeholder="Resim Adresi" width="100%" value="denemeee"/>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item style={{justifyContent:"right"}}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Resim Ekle
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              {loaderButton === true ? (
                <Spin indicator={antIcon} />
              ) : currentProduct && productId !== "new" ? (
                <Button type="primary" htmlType="submit">
                  Güncelle
                </Button>
              ) : (
                <Button type="primary" htmlType="submit">
                  Kaydet
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreateProductForm;
