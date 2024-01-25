import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const CheckoutTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Plastic Bottle",
      quantity: 20,
      weight: 0,
      isChecked: false,
    },
    { id: 2, name: "Plastic bag", quantity: 10, weight: 0, isChecked: false },
    { id: 3, name: "Ecobrick", quantity: 4, weight: 8, isChecked: false },
  ]);
  const [checkAll, setCheckAll] = useState(false);

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

  const handleWeightChange = (productId, newWeight) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, weight: newWeight } : product
      )
    );
  };
  const handleCheckAll = () => {
    setCheckAll((prevCheckAll) => {
      const updatedCheckAll = !prevCheckAll;
      setProducts((prevProducts) =>
        prevProducts.map((product) => ({
          ...product,
          isChecked: updatedCheckAll,
        }))
      );
      return updatedCheckAll;
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm rtl:text-right text-center">
        <thead className="font-medium uppercase bg-green-2 text-white">
          <tr>
            <th className="px-6 py-5">
              <label>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={checkAll}
                  onChange={handleCheckAll}
                />
              </label>
            </th>
            <th>Produk</th>
            <th>Jumlah Koin</th>
            <th>Berat</th>
            <th>Hapus</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">
                <input type="checkbox" className="form-checkbox" />
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left">
                {product.name}
              </td>
              <td className="px-6 py-4">{product.quantity}</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleDecrement(product.id)}
                    className="decrement"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="count-checkout border-none bg-transparent max-w-12 text-center text-sm"
                    value={product.weight}
                    onChange={(e) =>
                      handleWeightChange(
                        product.id,
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                  <button
                    onClick={() => handleIncrement(product.id)}
                    className="increment"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(product.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2 cursor-pointer text-lg"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckoutTable;
