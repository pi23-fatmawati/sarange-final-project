import "./component.css";
import { useState } from "react";
import Pagination from "./Pagination";
import ButtonGreen from "./Button-green";
import ButtonYellow from "./ButtonYellow";
import ButtonOutline from "./Button-outline";
import { Link } from "react-router-dom";

const HistoryProcess = () => {
  const itemsPerPage = 10; //banyak data yang tampil tiap page
  const [currentPage, setCurrentPage] = useState(1);

  const transactionData = [
    {
      id: 1,
      tanggalTransaksi: "2024-01-23",
      waktuPenjemputan: "10:00",
      produk: "Botol Plastik, Botol Kaca",
      koin: 250,
      status: "Diproses",
    },
    {
      id: 2,
      tanggalTransaksi: "2024-01-22",
      waktuPenjemputan: "08:00",
      produk: "Botol kaca",
      koin: 30,
      status: "Diproses",
    },
    {
      id: 3,
      tanggalTransaksi: "2024-01-21",
      waktuPenjemputan: "12:00",
      produk: "Karung, plastik bag",
      koin: 200,
      status: "Konfirmasi",
    },
  ];

  // Calculate the total number of pages
  const totalPages = Math.ceil(transactionData.length / itemsPerPage);

  // Calculate the starting and ending index of the transactions for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, transactionData.length);

  const currentTransactions = transactionData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
                <td className="px-6 py-4">{transaction.tanggalTransaksi}</td>
                <td className="px-6 py-4">{transaction.produk}</td>
                <td className="px-6 py-4">{transaction.koin}</td>
                <td className="px-6 py-4">
                  {transaction.status === "Konfirmasi" ? (
                    <ButtonGreen text="Konfirmasi" padding="px-4" />
                  ) : (
                    <ButtonYellow disabled text="Diproses" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/sell/transactions/${transaction.id}?tanggalTransaksi=${transaction.tanggalTransaksi}&waktuPenjemputan=${transaction.waktuPenjemputan}&produk=${transaction.produk}&koin=${transaction.koin}&status=${transaction.status}`}
                  >
                    <ButtonOutline
                      text="Cek Detail"
                      width="w-max"
                      padding="px-4"
                      // onClick={() => console.log(transaction)}
                    />
                  </Link>
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

export default HistoryProcess;
