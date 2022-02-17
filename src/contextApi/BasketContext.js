import React, {useContext, useState, useEffect} from "react";
import {useProduct} from "./ProductContext";
import {message} from "antd";

const BasketContext = React.createContext();

export const useBasket = () => {
    return useContext(BasketContext);
};

export const BasketProvider = ({children}) => {
    const {productList} = useProduct();
    const [basket, setBasket] = useState([]);

    const addBasket = (product) => {
        console.log(product)
        const existProduct = basket.find(proItem => proItem.key === product.key);
        if (existProduct) {
            setBasket(
                basket.map(proItem => proItem.key === product.key ? {
                    ...existProduct,
                    gty: existProduct.gty + 1
                } : proItem)
            )
        } else {
            setBasket([...basket, {...product, gty: 1}]);
            message.success("Sepete yeni ürün eklendi.")
        }

    };

    const removeProduct = (product) => {
        const existProduct = basket.find((productItem) => productItem.key === product.key);
        if (existProduct) {
            setBasket(
                basket.filter(item => item.key !== product.key)
            )
        }
        // else{
        //   setBasket(
        //       basket.map(prod => prod.key === product.key ? {...existProduct, gty: existProduct.gty -1}: prod)
        //   )
        // }
    }

    const decreaseProduct = (product) => {
        const existProduct = basket.find((productItem) => productItem.key === product.key);
        if (existProduct.gty === 1) {
            setBasket(
                basket.filter(item => item.key !== product.key)
            )
        }
        else{
          setBasket(
              basket.map(prod => prod.key === product.key ? {...existProduct, gty: existProduct.gty -1}: prod)
          )
        }
    }
    useEffect(() => {
        //console.log(basket.map(pro => (pro.key)));
    }, [basket]);
    const values = {
        basket,
        addBasket,
        removeProduct,
        decreaseProduct
    };
    return (
        <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
    );
};
