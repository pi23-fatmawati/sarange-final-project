import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartItems = useSelector(state => state.cart.cartItems) || [];

  return (
    <>
      <Link to="/sell/checkout">
        <div className="flex gap-2 items-center fixed bottom-5 right-10 bg-green-2 text-white p-4 rounded-full">
          <FontAwesomeIcon icon={faBagShopping} className="text-3xl" />
          <div
            id="count-item"
            className="font-medium"
            style={{ display: cartItems.length === 0 ? "none" : "block" }}
          >
            {cartItems.length}
          </div>
        </div>
      </Link>
    </>
  );
}
