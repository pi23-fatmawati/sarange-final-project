import "./BottomNav.css";
import { Link } from "react-router-dom";
import ButtonGreen from "./Button-green";

const BottomNav = () => {
  return (
    <div className={`bottom-nav`}>
      <div className="flex h-full items-center justify-around max-w-lg-xl mx-auto font-medium">
        <label className="bottom-nav-label">Total Produk:</label>
        <label className="bottom-nav-label">Total Koin:</label>
        <Link to="/sell/pick-up">
          <ButtonGreen text="Atur Penjualan" />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
