import React, { useState } from "react";

const CheckoutTable = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Plastic Bottle", quantity: 20, weight: 0 },
    { id: 2, name: "Plastic bag", quantity: 10, weight: 0 },
    { id: 3, name: "Ecobrick", quantity: 4, weight: 8 },
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>{/* ... header cells */}</tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td className="px-6 py-4">
                <input type="checkbox" className="form-checkbox" />
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
              </td>
              <td className="px-6 py-4">{product.quantity}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement(product.id)}
                    className="mr-1"
                  >
                    -
                  </button>
                  {product.weight}
                  <button
                    onClick={() => handleIncrement(product.id)}
                    className="ml-1"
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
  );
};

export default CheckoutTable;
