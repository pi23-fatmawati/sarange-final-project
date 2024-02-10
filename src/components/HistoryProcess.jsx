import "./component.css";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import ButtonGreen from "./Button-green";
import ButtonYellow from "./ButtonYellow";
import ButtonOutline from "./Button-outline";
import { Link } from "react-router-dom";

const History = () => {
  const itemsPerPage = 4; // Banyak data yang tampil tiap halaman
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionData, setTransactionData] = useState([]);

  // Mengambil data transaksi dari endpoint
  useEffect(() => {
    const fetchProcessData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://final-sarange-eff62c954ab5.herokuapp.com/transaction/process",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

        // Memeriksa apakah ada data transaksi yang diterima dari API
        if (Array.isArray(data.transactions) && data.transactions.length > 0) {
          setTransactionData((prevData) => [...prevData, ...data.transactions]);
        } else {
          console.warn("Tidak ada data transaksi proses yang tersedia.");
        }
      } catch (error) {
        console.error("Error fetching process transaction data:", error);
      }
    };

    const fetchConfirmData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://final-sarange-eff62c954ab5.herokuapp.com/transaction/confirm",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);

        // Memeriksa apakah ada data transaksi yang diterima dari API
        if (Array.isArray(data.transactions) && data.transactions.length > 0) {
          setTransactionData((prevData) => [...prevData, ...data.transactions]);
        } else {
          console.warn("Tidak ada data transaksi konfirmasi yang tersedia.");
        }
      } catch (error) {
        console.error("Error fetching confirm transaction data:", error);
      }
    };

    fetchProcessData();
    fetchConfirmData();
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(transactionData.length / itemsPerPage);

  // Sort transactions by status: Konfirmasi -> Diproses
  const sortedTransactions = transactionData.sort((a, b) => {
    if (a.status === "Konfirmasi" && b.status === "Diproses") return -1;
    if (a.status === "Diproses" && b.status === "Konfirmasi") return 1;
    return 0;
  });

  // Calculate the starting and ending index of the transactions for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    sortedTransactions.length
  );

  const currentTransactions = sortedTransactions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const confirmTransactionById = async (transactionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://final-sarange-eff62c954ab5.herokuapp.com/transaction/${transactionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data); // Handle response data accordingly
    } catch (error) {
      console.error("Error confirming transaction:", error);
    }
  };

  return (
    <>
      <div className="tabel relative overflow-x-auto sm:rounded-lg mt-4">
        <table className="w-full text-sm rtl:text-right">
          <thead className="font-medium text-center text-s text-white uppercase bg-green-2">
            <tr>
              <th className="px-6 py-4">Tanggal Transaksi</th>
              <th className="px-6 py-4">Produk</th>
              <th className="px-6 py-4">Koin</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Detail</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentTransactions.map((transaction, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  {new Date(transaction.pickup_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {transaction.Cart.Product.product_name}
                </td>
                <td className="px-6 py-4">{transaction.Cart.total_coin}</td>
                <td className="px-6 py-4">
                  {transaction.status === "Diproses" ? (
                    <ButtonYellow disabled text="Diproses" />
                  ) : (
                    <ButtonGreen
                      text="Dikonfirmasi"
                      padding="px-4"
                      onClick={() =>
                        confirmTransactionById(transaction.id_transaction)
                      }
                    />
                  )}
                </td>
                <td className="px-6 py-4">
                  <ButtonOutline
                    text="Cek Detail"
                    width="w-max"
                    padding="px-4"
                    disabled
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default History;
