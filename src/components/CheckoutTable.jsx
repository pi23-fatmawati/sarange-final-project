import React, { useState } from "react";
const CheckoutTable = () => {
  const [weight, setWeight] = useState(0);

  const handleIncrement = () => {
    setWeight(weight + 1);
  };

  const handleDecrement = () => {
    if (weight > 0) {
      setWeight(weight - 1);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <input type="checkbox" className="form-checkbox" />
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Coin Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Weight
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td className="px-6 py-4">
              <input type="checkbox" className="form-checkbox" />
            </td>
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Plastic Bottle
            </td>
            <td className="px-6 py-4">20</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <button onClick={handleDecrement} className="mr-1">
                  -
                </button>
                {weight}
                <button onClick={handleIncrement} className="ml-1">
                  +
                </button>
              </div>
            </td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
              >
                Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CheckoutTable;
