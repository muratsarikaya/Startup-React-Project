import React from "react";
import Sidebar from "../common/Sidebar";
import MainDashboard from "./MainDashboard";
import ProductsList from "./admin/Product/ProductsList";
import NewProduct from "./admin/Product/NewProduct";
import UpdateProduct from "./admin/Product/UpdateProduct";
import NewCategory from "./admin/Product/NewCategory";
import CategoryList from "./admin/Product/CategoryList";
import { Row, Col } from "antd";
import { Switch, Route } from "react-router-dom";
import UpdateCategory from "./admin/Product/UpdateCategory";

function Dashboard() {
  return (
    <>
      <Row wrap={false}>
        <Col flex="none">
          <Sidebar style={{ padding: "0 16px" }} />
        </Col>
        <Col flex="auto">
          <Switch>
          <Route
              exact
              path="/dashboard/product/category/:categoryId"
              component={UpdateCategory}
            />
            <Route
              exact
              path="/dashboard/product/categories"
              component={CategoryList}
            />
            <Route
              exact
              path="/dashboard/product/:productId"
              component={UpdateProduct}
            />

            <Route exact path="/dashboard/products" component={ProductsList} />
            <Route exact path="/dashboard/product/new" component={NewProduct} />

            <Route
              exact
              path="/dashboard/product/category/new"
              component={NewCategory}
            />

            <Route exact path="/dashboard" component={MainDashboard} />
          </Switch>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
