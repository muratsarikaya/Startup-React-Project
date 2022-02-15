import React, { useState, useEffect } from "react";
import { useCategory } from "../../contextApi/CategoryContext";
import { useParams, useHistory } from "react-router-dom";
import { Form, Input, InputNumber, Button, message, Spin } from "antd";
import { Row, Col, Select, Typography, Switch } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import slugify from 'react-slugify';

function handleChange(value) {
  console.log(`selected ${value}`);
}

function onChangeSwitch(checked) {
  console.log(`switch to ${checked}`);
}

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

const CreateCategoryForm = () => {
  const { categoryList, sendCategory, updateCategory } = useCategory();
  const { categoryId } = useParams();
  const history = useHistory();
  const [loaderButton, setLoaderButton] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const currentCategory =
    categoryList &&
    categoryList.filter((category) => category.key === categoryId);
  const options = [];
  
  if(categoryList){
    for (let i = 0; i < categoryList.length; i++) {
      let value = categoryList[i].category_name
      console.log(value)
      options.push({
        value
      });
    }
  }
  

  /* for (let i = 0; i < 100000; i++) {
    const value = `${i.toString(36)}${i}`;
    options.push({
      value,
      disabled: i === 10,
    });
  } */
  const [formCategory] = Form.useForm();
  formCategory.setFieldsValue({
    category_name: "",
    category_context: "",
    category_image_url: "",
    category_parent_name: [],
    category_is_active: "",
  });

  const initialValues = JSON.stringify({
    category_name: "",
    category_context: "",
    category_image_url: "",
    category_parent_name: [""],
    category_is_active: "",
  });
  const saveForm = (values) => {
    const data = {
      category_name: values.category_name,
      category_slug : slugify(values.category_name),
      category_context: values.category_context,
      category_image_url: values.category_image_url,
      category_parent_name: values.category_parent_name,
      category_is_active: values.category_is_active,
    };
    try {
      sendCategory(data);
      history.push("/dashboard/product/categories")
      message.success("Başarı olarak kaydedildi.");
      formCategory.resetFields();
    } catch (err) {
      message.error("Kaydetme işlemi başarısız oldu.");
    }
  };
  const updateForm = (values) => {
    console.log(currentCategory);
    const data = {
      category_name: values.category_name,
      category_slug : slugify(values.category_name),
      category_context: values.category_context,
      category_image_url: values.category_image_url,
      category_parent_name: values.category_parent_name,
      category_is_active: values.category_is_active,
    };

    try {
      updateCategory(currentCategory[0].key, data);
      history.push("/dashboard/product/categories")
      message.success("Başarı olarak güncellendi.");
    } catch (err) {
      message.error("Kaydetme işlemi başarısız oldu.");
    }
  };

  const setCategoryFrom = () => {
    console.log("setting field value");
    if (currentCategory) {
      formCategory.setFieldsValue({
        category_name: currentCategory[0].category_name,
        category_context: currentCategory[0].category_context,
        category_image_url: currentCategory[0].category_image_url,
        category_parent_name: currentCategory[0].category_parent_name,
        category_is_active: currentCategory[0].category_is_active,
      });
    } else {
      formCategory.setFieldsValue({
        category_name: "",
        category_context: "",
        category_image_url: "",
        category_parent_name: [],
        category_is_active: "",
      });
    }
  };

  if(categoryId !== "new"){
    currentCategory && setCategoryFrom();
    
  }
  else{
    formCategory.setFieldsValue({
      category_name: "",
      category_context: "",
      category_image_url: "",
      category_parent_name: [],
      category_is_active: "",
    });

  }
  
  return (
    <>
      <Form
        form={formCategory}
        {...layout}
        onFinish={
          currentCategory && categoryId !== "new" ? updateForm : saveForm
        }
        name="nest-messages"
        validateMessages={validateMessages}
        initialValue={initialValues}
      >
        <Row>
          <Col span={12} offset={2}>
            <Form.Item
              name={["category_name"]}
              label="Kategori Adı"
              rules={[{ required: true }]}
            >
              <Input style={{ textAlign: "left" }} />
            </Form.Item>
            <Form.Item
              name={["category_context"]}
              label="Kategori Açıklaması"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name={["category_image_url"]}
              label="Resim Adresi"
              rules={[{ required: true }]}
            >
              <Input style={{ textAlign: "left" }} />
            </Form.Item>
            <Form.Item
              name={["category_parent_name"]}
              label="Üst Kategori"
              rules={[
                {
                  required: false,
                  type: "array",
                },
              ]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Seçiniz"
                defaultValue={[]}
                onChange={handleChange}
                options={options}
              />
            </Form.Item>
            <Form.Item
              valuePropName="checked"
              name={["category_is_active"]}
              label="Kategori Durumu"
              // rules={[{ required: true }]}
              initialValue={true}
            >
              <Switch defaultChecked onChange={onChangeSwitch} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
               {loaderButton === true ? (
                <Spin indicator={antIcon} />
              ) : currentCategory && categoryId !== "new" ? (
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

export default CreateCategoryForm;
