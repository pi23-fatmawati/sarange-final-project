import React, { useState } from "react";
import Vector from "../pic/Vector.svg";
import BottomNav from "./BottomNav";
import "./CheckoutTable.css";

const CheckoutTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      url: "https://www.youngontop.com/wp-content/uploads/2023/08/the-bottle-5128607_640.jpg",
      name: "Plastic Bottle",
      quantity: 20,
      weight: 0,
    },
    {
      id: 2,
      url: "https://www.youngontop.com/wp-content/uploads/2023/08/the-bottle-5128607_640.jpg",
      name: "Plastic bag",
      quantity: 10,
      weight: 0,
    },
    {
      id: 3,
      url: "https://www.youngontop.com/wp-content/uploads/2023/08/the-bottle-5128607_640.jpg",
      name: "Ecobrick",
      quantity: 4,
      weight: 8,
    },
  ]);

  const handleIncrement = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, weight: product.weight + 1 }
          : product
      )
    );
  };

  const handleDecrement = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.weight > 0
          ? { ...product, weight: product.weight - 1 }
          : product
      )
    );
  };

  const handleDelete = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <>
      <div className="flex items-center">
        <img src={Vector} alt="" />
        <label>Keranjang Penjualan</label>
      </div>
      <div className="relative overflow-x-auto sm:rounded-lg ">
        {/* mr-16 ml-16 */}
        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="font-medium text-center text-s text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <td className="px-6 py-4">
              <input type="checkbox" className="form-checkbox" />
            </td>
            <td className="px-6 py-4">Nama Produk</td>
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4">Jumlah Koin</td>
            <td className="px-6 py-4">Berat</td>
            <td className="px-6 py-4">Aksi</td>
          </thead>
          <tbody className="text-center">
            {products.map((product) => (
              <tr
                key={product.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="form-checkbox" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center justify-center">
                  <img
                    src={product.url}
                    alt=""
                    style={{ width: "auto", height: "75px" }}
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.name}
                </td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleDecrement(product.id)}
                      className="mr-1 decrement-button"
                    >
                      -
                    </button>
                    {product.weight}
                    <button
                      onClick={() => handleIncrement(product.id)}
                      className="ml-1 increment-button"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    onClick={() => handleDelete(product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BottomNav />
    </>
  );
};

export default CheckoutTable;
