import React from "react";
import { useAuth } from "../../contextApi/AuthContext";
import { Route } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Dashboard from "../../pages/Dashboard";
import { Redirect } from "react-router-dom";
import ProductListPage from "../../pages/ProductListPage";
import ProductDetail from "../../pages/ProductDetail";
import "react-image-gallery/styles/css/image-gallery.css"
import CartPage from "../../pages/CartPage";
const MainRouter = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <Route path="/about" />
      <Route path="/product-list" component={ProductListPage} />
      <Route path="/product/:productId" component={ProductDetail} />
      <Route path="/sign-up" component={Register} />
      <Route path="/sign-in" component={Login} />
      <Route path="/cart" component={CartPage} />

      {localStorage.is_auth ? (
        <Route path="/dashboard" component={Dashboard} />
      ) : (
        <Redirect to="/" />
      )}
      <Route exact path="/" component={Home} />
    </>
  );
};

export default MainRouter;
