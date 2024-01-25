import "./component.css";
import { useState } from "react";
import Pagination from "./Pagination";
import ButtonGreen from "./Button-green";
import ButtonOutline from "./Button-outline";

const HistorySuccess = () => {
  const itemsPerPage = 2; //banyak data yang tampil tiap page
  const [currentPage, setCurrentPage] = useState(1);

  const transactionData = [
    {
      tanggalTransaksi: "2024-01-23",
      waktuPenjemputan: "10:00",
      produk: "Botol Plastik, Botol Kaca",
      koin: 250,
      status: "Selesai",
      detailLink: "/detail/transaksi/1",
    },
    {
      tanggalTransaksi: "2024-01-22",
      waktuPenjemputan: "08:00",
      produk: "Botol kaca",
      koin: 30,
      status: "Selesai",
      detailLink: "/detail/transaksi/2",
    },
    {
      tanggalTransaksi: "2024-01-21",
      waktuPenjemputan: "12:00",
      produk: "Karung, plastik bag",
      koin: 200,
      status: "Selesai",
      detailLink: "/detail/transaksi/3",
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
      <div className=" tabel relative overflow-x-auto sm:rounded-lg mt-4">
        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="font-medium text-center text-s text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4">Tanggal Transaksi</th>
              <th className="px-6 py-4">Waktu Penjemputan</th>
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
                <td className="px-6 py-4">{transaction.waktuPenjemputan}</td>
                <td className="px-6 py-4">{transaction.produk}</td>
                <td className="px-6 py-4">{transaction.koin}</td>
                <td className="px-6 py-4">
                  <ButtonGreen
                    disabled={transaction.status === "Selesai"}
                    padding="px-4"
                    text={transaction.status}
                  />
                </td>
                <td className="px-6 py-4">
                  <a href={transaction.detailLink}>
                    <ButtonOutline
                      text="Cek Detail"
                      width="w-max"
                      padding="px-4"
                    />
                  </a>
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

export default HistorySuccess;
