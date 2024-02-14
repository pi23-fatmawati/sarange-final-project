import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../redux/slice/product-slice";
import { Card, List, ListItem } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import BackNavigation from "../components/BackNavigation";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.product.productDetail);
  const isLoading = useSelector((state) => state.product.isLoading);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="container-page flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!productDetail) {
    return (
      <div className="container-page flex justify-center items-center">
        Gagal menampilkan produk.
      </div>
    );
  }

  return (
    <>
      <div className="container-page">
        <BackNavigation page="Jual Sampah" />
        <Card
          className="detail-card md:max-w-full gap-3"
          imgSrc={productDetail.product_pic}
          horizontal
        >
          <h5 className="text-2xl font-medium">{productDetail.product_name}</h5>
          <h4 className="text-2xl font-bold text-green-2">
            <FontAwesomeIcon icon={faCoins} /> {productDetail.coin} koin
          </h4>
          <p>
            <b>Ketentuan:</b>
            <br />
            <List style={{color: "black"}}>
              {productDetail.description.split("\n").map((line, index) => (
                <ListItem key={index}>{line}</ListItem>
              ))}
            </List>
          </p>
        </Card>
      </div>
    </>
  );
}

export default ProductDetail;