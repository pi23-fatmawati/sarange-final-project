import "./History.css";
const HistoryProcess = () => {
  const transactionData = [
    {
      tanggalTransaksi: "2024-01-23",
      waktuPenjemputan: "10:00",
      produk: "Botol Plastik, Botol Kaca",
      koin: 250,
      status: "Diproses",
      detailLink: "/detail/transaksi/1",
    },
    {
      tanggalTransaksi: "2024-01-22",
      waktuPenjemputan: "08:00",
      produk: "Botol kaca",
      koin: 30,
      status: "Diproses",
      detailLink: "/detail/transaksi/2",
    },
    {
      tanggalTransaksi: "2024-01-21",
      waktuPenjemputan: "12:00",
      produk: "Karung, plastik bag",
      koin: 200,
      status: "Diproses",
      detailLink: "/detail/transaksi/3",
    },
  ];

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="font-medium text-center text-s text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <td className="px-6 py-4">Tanggal Transaksi</td>
              <td className="px-6 py-4">Waktu Penjemputan</td>
              <td className="px-6 py-4">Produk</td>
              <td className="px-6 py-4">Koin</td>
              <td className="px-6 py-4">Status</td>
              <td className="px-6 py-4">Detail</td>
            </tr>
          </thead>
          <tbody className="text-center">
            {transactionData.map((transaction, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">{transaction.tanggalTransaksi}</td>
                <td className="px-6 py-4">{transaction.waktuPenjemputan}</td>
                <td className="px-6 py-4">{transaction.produk}</td>
                <td className="px-6 py-4">{transaction.koin}</td>
                <td className="px-6 py-4">
                  <button className="status-button">
                    {transaction.status}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <a href={transaction.detailLink} className="detail-button">
                    <button>Cek Detail</button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistoryProcess;
