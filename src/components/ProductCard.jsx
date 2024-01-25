import { Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ButtonGreen from "./Button-green";
import ButtonOutline from "./Button-outline";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

function ProductCard({ id, imgSrc, imgAlt, title, coin }) {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    const product = { id, imgSrc, imgAlt, title, coin };
    dispatch(addToCart(product));
    console.log("Masukkan Keranjang button clicked:", product);
  };
  return (
    <Card
      className="w-64 hover:border-green-2 product-card"
      imgSrc={imgSrc}
      imgAlt={imgAlt}
    >
      <h5 className="text-xl font-medium tracking-tight">{title}</h5>
      <div className="text-medium font-normal">
        <FontAwesomeIcon icon={faCoins} /> {coin} koin per kg.
      </div>
      <div className="buttons flex flex-col gap-2">
        <ButtonGreen text="Masukkan Keranjang" onClick={addToCartHandler} />
        <Link to={`/sell/products/${id}`}>
          <ButtonOutline text="Detail" />
        </Link>
      </div>
    </Card>
  );
}

export default ProductCard;
