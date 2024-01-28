import { useParams } from "react-router-dom";

export default function DetailTransaction() {
    const {id: routeId} = useParams()
    const transaction = transactionData.find((t) => t.id === parseInt(routeId, 10));
    if (!transaction) {
        return <div className="container-page">Transaksi tidak ditemukan</div>
    } 
    const {tanggalTransaksi, waktuPenjemputan, produk, koin, status} = transaction;
  return (
    <div className="container-page">
      <h2>Transaction Details</h2>
      <p>ID: {id}</p>
      <p>Tanggal Transaksi: {tanggalTransaksi}</p>
      <p>Waktu Penjemputan: {waktuPenjemputan}</p>
      <p>Produk: {produk}</p>
      <p>Koin: {koin}</p>
      <p>Status: {status}</p>
    </div>
  );
}
