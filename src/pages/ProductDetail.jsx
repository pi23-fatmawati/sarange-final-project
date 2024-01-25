import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import BackNavigation from "../components/BackNavigation";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProducts] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(
          `https://656bda9ee1e03bfd572ddc89.mockapi.io/sarange/listSampah/${id}`
        );
        const data = await response.json();
        setProducts(data);
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
          imgSrc={product.img}
          horizontal
        >
          <h5 className="text-2xl font-medium">{product.nama}</h5>
          <h4 className="text-2xl font-bold text-green-2">
            <FontAwesomeIcon icon={faCoins} /> {product.koin} koin
          </h4>
          <ul>
            <b>Ketentuan:</b>
            {product.deskripsi.map((item) => (
              <li key={id} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

export default ProductDetail;
