import React from "react";
import { PageHeader } from "antd";

const Styles = {
  textLeft:"left"
}


const HeaderPage = ({pageTitle}) => {
  const routes = [
    {
      path: "index",
      breadcrumbName: "Dashboard",
    },
    {
      path: "first",
      breadcrumbName: "Ürünler",
    },
    {
      path: "second",
      breadcrumbName: pageTitle && pageTitle,
    },
  ];
  
  return (
    <>
      <PageHeader style={{textAlign: Styles.textLeft}}
        className="site-page-header "
        title={pageTitle && pageTitle}
        breadcrumb={{ routes }}
        subTitle=""
      />
    </>
  );
};

export default HeaderPage;
