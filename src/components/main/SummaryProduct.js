import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "../../pages/admin/Common.module.css"
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Col } from "reactstrap";
import { useProduct } from "../../contextApi/ProductContext";
import { Link } from "react-router-dom";

const SummaryProduct = () => {
  const { productList, getProducts } = useProduct();
  // console.log(productList);
  //console.log(useProduct());
  useEffect(() => {
    getProducts();
    console.log("useProduct");
  }, []);

  return (
    <>
      {productList ?
        productList.map((product) => (
          <Col xs="3" style={{padding:"0 15px"}} className={styles.productItemMb}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <LazyLoadImage
                  className={styles.imgListResponse}
                  src={product.image_url} // use normal <img> attributes as props
                  
                />
              </div>

              <CardBody>
                <CardTitle className={styles.titleColumnOne}>{product.product_name}</CardTitle>

                <CardText className={styles.contextColumnThree}>{product.product_context}</CardText>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <Button>
                    <Link
                      to={`/product/${product.key}`}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      Detay
                    </Link>
                  </Button>
                  <Button success>
                    <Link
                      to={`/product/${product.key}`}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      Sepete Ekle
                    </Link>
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        )): <div></div>}
    </>
  );
};

export default SummaryProduct;
