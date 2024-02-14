import { faHistory } from "@fortawesome/free-solid-svg-icons";
import BackNavigation from "../components/BackNavigation";
import Tab from "../components/Tab";

export default function Transactions() {
  return (
    <div className="container-page">
      <BackNavigation page="Riwayat Transaksi" icon={faHistory} />
      <Tab />
    </div>
  );
}
