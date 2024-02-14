import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux/slice/cart-slice";
import { useEffect } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(updateCart());
  }, [dispatch]);

  return (
    <>
      <Link to="/sell/checkout">
        <div className="flex gap-2 items-center fixed bottom-5 right-10 bg-green-2 text-white p-4 rounded-full">
          <FontAwesomeIcon icon={faBagShopping} className="text-3xl" />
          <div
            id="count-item"
            className="font-medium text-lg"
            style={{ display: cartItems.length === 0 ? "none" : "block" }}
          >
            {cartItems.length}
          </div>
        </div>
      </Link>
    </>
  );
}