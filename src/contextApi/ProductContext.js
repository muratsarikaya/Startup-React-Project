import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";

const ProductContext = React.createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState();

  const getProducts = () => {
    console.log("getProducts çalıştı");
    db.collection("product").onSnapshot((snapshot) =>
      setProducts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  };

  const sendProduct = (data) => {
    try {
      db.collection("product").add(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = (id, data) => {
    db.collection("product").doc(id).update(data);
  };

  const deleteProduct = (id) => {
    db.collection("product").doc(id).delete();
  };

  const productFilter = async (category, priceMin, priceMax) => {
    console.log("Product Filter çalıştı");
    console.log(category);
    const result = await db
      .collection("product")
      .where("price", ">=", priceMin)
      .where("price", "<=", priceMax)
      .where("category_slug", "==", category)
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  };

  useEffect(() => {
    console.log("hook çalıştı");
    const getProductList = async () => {
      await getProducts();
    };
    getProductList();
    console.log(products);
    return getProductList();
  }, []);

  const productList =
    products &&
    products.map((pro) => ({
      key: pro.id,
      category_name: pro.data.category_name,
      product_name: pro.data.product_name,
      available: pro.data.available,
      price: pro.data.price,
      product_context: pro.data.product_context,
      image_url: pro.data.image_url,
      image_list: pro.data.image_list,
    }));
  const productHandle = () => {
    products &&
      products.map((pro) => ({
        key: pro.id,
        category_name: pro.data.category_name,
        product_name: pro.data.product_name,
        available: pro.data.available,
        price: pro.data.price,
        product_context: pro.data.product_context,
        image_url: pro.data.image_url,
      }));
    return products;
  };
  const values = {
    productList,
    productHandle,
    getProducts,
    sendProduct,
    updateProduct,
    deleteProduct,
    productFilter,
  };
  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
