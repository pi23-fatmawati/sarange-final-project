import "./component.css";
import { useState, useEffect } from "react";
import ButtonGreen from "./Button-green";
import ButtonYellow from "./ButtonYellow";
import ButtonOutline from "./Button-outline";
import Cookies from "js-cookie";
import { Pagination } from "flowbite-react";
import SuccessModal from "./SuccessModal";

const History = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [confirmedTransactionId, setConfirmedTransactionId] = useState(null)

  useEffect(() => {
    const fetchProcessData = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const response = await fetch(
          "https://final-sarange-eff62c954ab5.herokuapp.com/transaction/process",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        const data = await response.json();

        if (Array.isArray(data.transactions) && data.transactions.length > 0) {
          setTransactionData((prevData) => [...prevData, ...data.transactions]);
          setLoading(false);
        } else {
          setLoading(false);
          console.warn("Tidak ada data transaksi proses yang tersedia.");
        }
      } catch (error) {
        console.error("Error fetching process transaction data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchConfirmData = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const response = await fetch(
          "https://final-sarange-eff62c954ab5.herokuapp.com/transaction/confirm",
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data.transactions) && data.transactions.length > 0) {
          setTransactionData((prevData) => [...prevData, ...data.transactions]);
          setLoading(false);
        } else {
          setLoading(false);
          console.warn("Tidak ada data transaksi konfirmasi yang tersedia.");
        }
      } catch (error) {
        console.error("Error fetching confirm transaction data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessData();
    fetchConfirmData();
  }, [confirmedTransactionId]);

  const sortedTransactions = transactionData.sort((a, b) => {
    if (a.status === "Konfirmasi" && b.status === "Diproses") return -1;
    if (a.status === "Diproses" && b.status === "Konfirmasi") return 1;
    return 0;
  });
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    sortedTransactions.length
  );
  const currentTransactions = sortedTransactions.slice(startIndex, endIndex);
  const totalPages = Math.ceil(currentTransactions.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const confirmTransactionById = async (transactionId) => {
    try {
      const token = Cookies.get("token");
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
      await response.json();
      setConfirmedTransactionId(transactionId)
      setSuccessModal(true)
    } catch (error) {
      console.error("Error confirming transaction:", error);
    }
  };

  return (
    <>
      <div className="tabel relative overflow-x-auto sm:rounded-lg mt-4 mb-5">
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
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4">
                  Loading...
                </td>
              </tr>
            ) : transactionData.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4">
                  Belum ada transaksi
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
                    {transaction.status === "Diproses" ? (
                      <ButtonYellow disabled text="Diproses" />
                    ) : (
                      <ButtonGreen
                        text="Dikonfirmasi"
                        padding="px-4"
                        onClick={() =>
                          confirmTransactionById(transaction.id_transaction)
                        }
                        disabled={transaction.id_transaction === confirmedTransactionId}
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
              ))
            )}
          </tbody>
        </table>
        <SuccessModal
        show={successModal}
        link="/sell/transactions"
        onClose={() => setSuccessModal(false)}
        header="Koinmu berhasil bertambah"
      />
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

export default History;