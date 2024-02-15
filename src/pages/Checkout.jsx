import BackNavigation from "../components/BackNavigation";
import BottomNav from "../components/BottomNav";
import CheckoutTable from "../components/CheckoutTable";

export default function Checkout() {
  return (
    <div className="container-page mt-20">
      <BackNavigation page="Jual Sampah" />
      <CheckoutTable />
      <BottomNav />
    </div>
  );
}
