import { Card } from "flowbite-react";
// import "../styles/sell-page.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ButtonGreen from "./Button-green";
import ButtonOutline from "./Button-outline";

function ProductCard({ imgSrc, imgAlt, title, coin, id }) {
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
        <ButtonGreen text="Masukkan Keranjang"></ButtonGreen>
        <Link to={`/sell/products/${id}`}>
          <ButtonOutline text="Detail"></ButtonOutline>
        </Link>
      </div>
    </Card>
  );
}

export default ProductCard;
