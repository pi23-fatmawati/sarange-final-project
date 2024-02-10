import "./BottomNav.css";
import { Link } from "react-router-dom";
import ButtonGreen from "./Button-green";
import { useSelector } from "react-redux";

const BottomNav = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { totalProducts, totalCoins } = cartItems.reduce(
    (totals, cartItem) => {
      totals.totalProducts += cartItem.total_product;
      totals.totalCoins += cartItem.total_coin * cartItem.total_product;
      return totals;
    },
    { totalProducts: 0, totalCoins: 0 }
  );

  return (
    <div className={`bottom-nav`}>
      <div className="flex h-full items-center justify-around max-w-lg-xl mx-auto font-medium">
        <label className="bottom-nav-label">
          Total Produk: {totalProducts} kg
        </label>
        <label className="bottom-nav-label">Total Koin: {totalCoins} koin</label>
        <Link to="/sell/pick-up">
          <ButtonGreen text="Atur Penjualan" />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;