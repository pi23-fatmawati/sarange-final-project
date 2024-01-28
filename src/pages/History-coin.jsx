import CardCoin from "../components/Card-coin";
import { useState, useEffect } from "react";
import "../App.css";
import BackNavigation from "../components/BackNavigation";

export default function HistoryCoin() {
  const [selectedOption, setSelectedOption] = useState("10");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const tableData = [
    { date: "06-11-2023", description: "Koin bertambah", coins: "+100" },
  ];
  return (
    <div className="container-page">
        <BackNavigation page="Beranda" />
      <div className="history-coin">
        <CardCoin coin={1000}></CardCoin>
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
              {tableData
                .slice(0, parseInt(selectedOption, 10))
                .map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td scope="col" className="px-6 py-4">
                      {item.date}
                    </td>
                    <td scope="col" className="px-6 py-4">
                      {item.description}
                    </td>
                    <td scope="col" className="px-6 py-4">
                      {item.coins}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
