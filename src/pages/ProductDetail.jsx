import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import BackNavigation from "../components/BackNavigation";
import React from "react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari local storage
        const response = await fetch(
          `https://final-sarange-eff62c954ab5.herokuapp.com/product/${id}`,
          {
            headers: {
              authorization: `${token}`, // Sertakan token dalam header Authorization
            },
          }
        );
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProductDetail();
  }, [id]);

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
