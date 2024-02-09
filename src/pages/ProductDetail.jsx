// File: pages/ProductDetail.jsx

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import BackNavigation from "../components/BackNavigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetail,
  clearProductDetail,
} from "../redux/slice/product-slice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productDetail);

  useEffect(() => {
    dispatch(getProductDetail(id));

    // Bersihkan detail produk saat komponen unmount
    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch, id]);

  if (!product) {
    return (
      <div className="container-page flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="container-page">
        <BackNavigation page="Jual Sampah" />
        <Card
          className="detail-card md:max-w-full gap-3"
          imgSrc={product.product_pic}
          horizontal
        >
          <h5 className="text-2xl font-medium">{product.product_name}</h5>
          <h4 className="text-2xl font-bold text-green-2">
            <FontAwesomeIcon icon={faCoins} /> {product.coin} koin
          </h4>
          <p>
            <b>Ketentuan:</b>
            <br />
            {product.description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </Card>
      </div>
    </>
  );
}

export default ProductDetail;
