import "./BottomNav.css";
import { Link, useNavigate } from "react-router-dom";
import ButtonGreen from "./Button-green";
import { useDispatch, useSelector } from "react-redux";
import { updateCartData } from "../redux/slice/cart-slice";

const BottomNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const selectedItems = useSelector((state) => state.cart.selectedItems);

  const { totalProducts, totalCoins } = cartItems.reduce(
    (totals, cartItem) => {
      if (selectedItems[cartItem.id_cart]) {
        totals.totalProducts += cartItem.total_product;
        totals.totalCoins += cartItem.total_coin * cartItem.total_product;
      }
      return totals;
    },
    { totalProducts: 0, totalCoins: 0 }
  );

  const handlePickUpButton = async () => {
    await dispatch(updateCartData());
    // navigate("/sell/pick-up");   
  };

  const isDisabled = Object.values(selectedItems).every((value) => !value);

  return (
    <div className={`bottom-nav`}>
      <div className="flex h-full items-center justify-around max-w-lg-xl mx-auto font-medium">
        <label className="bottom-nav-label">
          Total Produk: {totalProducts} kg
        </label>
        <label className="bottom-nav-label">
          Total Koin: {totalCoins} koin
        </label>
        {isDisabled ? (
          <div className="flex flex-col gap-[2px]">
            <ButtonGreen text="Atur Penjualan" disabled={isDisabled} />
            <div className="text-xs text-red-600 text-center">Produk harus diceklis</div>
          </div>
        ) : (
          <Link> 
            <ButtonGreen
              text="Atur Penjualan"
              onClick={handlePickUpButton}
              disabled={isDisabled}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default BottomNav;