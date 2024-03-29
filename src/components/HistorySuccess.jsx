import "./component.css";
import { useState, useEffect } from "react";
// import Pagination from "./Pagination";
import ButtonGreen from "./Button-green";
import ButtonOutline from "./Button-outline";
import Cookies from "js-cookie";
import { Pagination } from "flowbite-react";

const HistorySuccess = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false)
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://final-sarange-eff62c954ab5.herokuapp.com/transaction/success",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        const data = await response.json();
        if (data && Array.isArray(data.transactions)) {
          setTransactionData(data.transactions);
          setLoading(false);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const totalPages = Math.ceil(transactionData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, transactionData.length);

  const currentTransactions = Array.isArray(transactionData)
    ? transactionData.slice(startIndex, endIndex)
    : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="tabel relative overflow-x-auto sm:rounded-lg mt-4">
        <table className="w-full text-sm rtl:text-right">
          <thead className="font-medium text-center text-s uppercase bg-green-2 text-white">
            <tr>
              <th className="px-6 py-4">Tanggal Transaksi</th>
              <th className="px-6 py-4">Produk</th>
              <th className="px-6 py-4">Koin</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Detail</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {transactionData.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4">
                  Belum ada transaksi selesai
                </td>
              </tr>
            ) : (
              currentTransactions.map((transaction, index) => (
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
                    <ButtonGreen
                      disabled={transaction.status === "Selesai"}
                      padding="px-4"
                      text={transaction.status}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <a href={`/detail/transaksi/${transaction.id_transaction}`}>
                      <ButtonOutline
                        text="Cek Detail"
                        width="w-max"
                        padding="px-4"
                      />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        style={{
          textAlign: "center",
          fontSize: "small",
          display: transactionData.length === 0 ? "none" : "block",
        }}
        previousLabel="<<"
        nextLabel=">>"
      />
    </>
  );
};

export default HistorySuccess;