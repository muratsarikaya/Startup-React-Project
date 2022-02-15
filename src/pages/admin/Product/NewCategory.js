import React from "react";
import HeaderPage from "../../../components/header/HeaderPage";
import CreateCategoryForm from "../../../components/form/CreateCategoryForm";
import styles from "../../../pages/admin/Common.module.css"
import { Layout} from "antd";
const { Content } = Layout;

const NewCategory = () => {
  return (
    <>
      <Layout className="layout">
        <Content style={{ padding: "0 50px" }}>
          <div className={styles.siteLayoutContent}>
          <HeaderPage pageTitle="Kategori Ekle" />
            <CreateCategoryForm />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default NewCategory;
