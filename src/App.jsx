import "./App.css";
import CheckoutTable from "./components/CheckoutTable";
import BottomNav from "./components/BottomNav";
import Vector from "./pic/Vector.svg";
function App() {
  return (
    <>
      <div className="flex items-center">
        <img src={Vector} alt="" />
        <label>Keranjang Penjualan</label>
      </div>
      <CheckoutTable />
      <BottomNav />
    </>
  );
}

export default App;
