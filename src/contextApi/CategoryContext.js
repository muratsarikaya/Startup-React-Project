import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";

const CategoryContext = React.createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState();

  const getCategories = () => {
    console.log("getCategories çalıştı")
    db.collection("category").onSnapshot((snapshot) =>
    setCategories(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

  };

  const sendCategory = (data) => {
    try {
      db.collection("category").add(data);
    } catch (err) {
      console.log(err)
    }
  }

  const updateCategory = (id, data) =>{
    db.collection('category').doc(id).update(data);
  }

  const deleteCategory = (id) => {
      db.collection("category").doc(id).delete();
  }

  useEffect(() => {
     console.log("hook çalıştı")
    const getCategoryList = async () => {
      await getCategories();
    };
    getCategoryList();
    console.log(categories)
    return getCategoryList();
  }, []);

  const categoryList =
  categories &&
  categories.map((ctg) => ({
      key: ctg.id,
      category_parent_name: ctg.data.category_parent_name,
      category_slug : ctg.data.category_slug,
      category_name: ctg.data.category_name,
      category_context: ctg.data.category_context,
      category_image_url: ctg.data.category_image_url,
      category_is_active: ctg.data.category_is_active

    }));
/* const categoryHandle = () =>{
  categories && categories.map((pro) => ({
    key: pro.id,
    product_name: pro.data.product_name,
    available: pro.data.available,
    price: pro.data.price,
    product_context: pro.data.product_context,
    image_url: pro.data.image_url
  }))
  return categories
} */
  const values = {
    categoryList,
   // categoryHandle,
    getCategories,
    sendCategory,
    updateCategory,
    deleteCategory
  };
  return (
    <CategoryContext.Provider value={values}>{children}</CategoryContext.Provider>
  );
};
