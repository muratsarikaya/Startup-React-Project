import React from 'react'
import HeaderPage from "../../../components/header/HeaderPage";
import styles from "../../../pages/admin/Common.module.css";
import CreateCategoryForm from '../../../components/form/CreateCategoryForm';
import { Layout } from "antd";
const { Content } = Layout;

const UpdateCategory = () => {
  return (
      <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <div className={styles.siteLayoutContent}>
          <HeaderPage pageTitle="Ürün Güncelleme" />
          <CreateCategoryForm />
        </div>
      </Content>
    </Layout>
  )
}

export default UpdateCategory
