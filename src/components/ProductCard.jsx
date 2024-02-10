import { Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ButtonGreen from "./Button-green";
import ButtonOutline from "./Button-outline";
import { useDispatch } from "react-redux";
import { addCart, updateCart } from "../redux/slice/cart-slice";
import SuccessModal from "./SuccessModal";
import { useEffect, useState } from "react";

function ProductCard({ id, imgSrc, imgAlt, title, coin }) {
  const dispatch = useDispatch();
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await dispatch(addCart(id));
      await dispatch(updateCart());
      setSuccessModal(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeout;

    if (successModal) {
      timeout = setTimeout(() => {
        setSuccessModal(false);
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [successModal]);

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
        <ButtonGreen
          text={loading ? "Menambahkan..." : "Masukkan Keranjang"}
          onClick={handleAddToCart}
          disabled={loading}
        />
        <Link to={`/sell/products/${id}`}>
          <ButtonOutline text="Detail" />
        </Link>
      </div>
      <SuccessModal
        show={successModal}
        onClose={() => setSuccessModal(false)}
        header="Produk berhasil ditambahkan ke keranjang"
      />
    </Card>
  );
}

export default ProductCard;
