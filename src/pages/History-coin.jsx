import CardCoin from "../components/Card-coin";
import { useState, useEffect } from "react";
import "../App.css";
import BackNavigation from "../components/BackNavigation";
import axios from "axios";
import Cookies from "js-cookie";

function HistoryCoin() {
  const [selectedOption, setSelectedOption] = useState("10");
  const [coinHistory, setCoinHistory] = useState([]);
  const [coinUser, setCoinUser] = useState(0);
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const token = Cookies.get("token");

        // Fetch user data
        const userResponse = await axios.get(
          "https://final-sarange-eff62c954ab5.herokuapp.com/homepage",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const { coin_user: coinUser, id_user: userId } = userResponse.data.user;
        setCoinUser(coinUser);
        setUserId(userId);
        console.log(coinUser);

        // Fetch coin history
        const historyResponse = await axios.get(
          "https://final-sarange-eff62c954ab5.herokuapp.com/coin-history",
          {
            headers: {
              Authorization: token,
            },
          },
        );
        const coinHistory = historyResponse.data.data
        const filteredCoinHistory = coinHistory.filter((item) => item.id_user === userId)
        console.log(filteredCoinHistory);
        setCoinHistory(filteredCoinHistory)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, []);
  

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="container-page mt-20">
      <BackNavigation page="Beranda" />
      <div className="history-coin">
        <CardCoin coin={coinUser !== null &&coinUser !== undefined
              ? `${coinUser}` : "0"}></CardCoin>
        <div className="table-history mt-8 container mx-auto">
          <p>Rincian Transaksi:</p>
          <div className="dropdown-filter py-2 pl-4 w-full mt-2">
            <label htmlFor="dropdown" className="pr-4 font-semibold">
              Tampilkan
            </label>
            <select
              id="dropdown"
              className="bg-gray-300 rounded"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <table className="w-full text-sm text-center">
            <thead className="text-sm font-semibold">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3">
                  Keterangan
                </th>
                <th scope="col" className="px-6 py-3">
                  Koin
                </th>
              </tr>
            </thead>
            <tbody>
              {coinHistory && coinHistory.length > 0 ? (
                coinHistory
                .slice(0, parseInt(selectedOption, 10))
                .map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td scope="col" className="px-6 py-4">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </td>
                    <td scope="col" className="px-6 py-4">
                      {item.desc_transaction}
                    </td>
                    <td scope="col" className="px-6 py-4">
                      {item.coin_history}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Tidak ada transaksi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryCoin