import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCart,
  deleteCart,
  incrementCartItem,
  decrementCartItem,
  updateSelectedItems,
} from "../redux/slice/cart-slice";
import { getProduct } from "../redux/slice/product-slice";

const CheckoutTable = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.product);
  const [loading, setLoading] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  const handleIncrement = (id_cart) => {
    dispatch(incrementCartItem(id_cart));
  };

  const handleDecrement = (id_cart) => {
    dispatch(decrementCartItem(id_cart));
  };

  const handleDelete = async (id_cart) => {
    try {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [id_cart]: true,
      }));
      dispatch(deleteCart(id_cart));
      await dispatch(updateCart());
    } catch (error) {
      console.error("Error deleting cart item:", error);
    } finally {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [id_cart]: false,
      }));
    }
  };

  const handleWeightChange = (id_cart, newWeight) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id_cart === id_cart
        ? { ...cartItem, total_product: newWeight }
        : cartItem
    );
    dispatch(updateCart(updatedCartItems));
  };

  const handleCheckAll = () => {
    setSelectAllChecked((prev) => !prev);
    const updatedSelectedItems = {};
    const allItemIds = cartItems.map((item) => item.id_cart);

    allItemIds.forEach((id) => {
      updatedSelectedItems[id] = !selectAllChecked;
    });

    setSelectedItems(updatedSelectedItems);
    dispatch(updateSelectedItems(updatedSelectedItems));
  };

  const handleItemCheck = (id_cart) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [id_cart]: !prevSelectedItems[id_cart],
    }));
    dispatch(updateSelectedItems({ [id_cart]: !selectedItems[id_cart] }));
  };

  const isCartItemChecked = (id_cart) => {
    return selectedItems[id_cart] === true;
  };

  useEffect(() => {
    dispatch(updateCart());
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-24">
      <table className="w-full text-sm rtl:text-right text-center">
        <thead className="font-medium uppercase bg-green-2 text-white">
          <tr>
            <th className="px-6 py-5">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectAllChecked}
                onChange={handleCheckAll}
              />
            </th>
            <th>Produk</th>
            <th>Jumlah Koin</th>
            <th>Berat</th>
            <th>Hapus</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-4">
                Loading...
              </td>
            </tr>
          ) : (
            cartItems.map((cartItem) => {
              const product = products.find(
                (p) => p.id_product === cartItem.id_product
              );
              return (
                <tr key={cartItem.id_cart} className="odd:bg-white even:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={isCartItemChecked(cartItem.id_cart)}
                      onChange={() => handleItemCheck(cartItem.id_cart)}
                    />
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    {product && (
                      <div className="flex items-center gap-3">
                        <div>
                          <img
                            src={product.product_pic}
                            alt={product.product_name}
                            className="w-16 h-16 object-cover"
                          />
                        </div>
                        <div>{product.product_name}</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {cartItem.total_coin * cartItem.total_product}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDecrement(cartItem.id_cart)}
                        className="decrement"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="count-checkout border-none bg-transparent max-w-12 text-center text-sm"
                        value={cartItem.total_product}
                        onChange={(e) =>
                          handleWeightChange(
                            cartItem.id_cart,
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                      <button
                        onClick={() => handleIncrement(cartItem.id_cart)}
                        className="increment"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {loading[cartItem.id_cart] ? (
                      <div className="text-lg text-gray-500">
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </div>
                    ) : (
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleDelete(cartItem.id_cart)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2 cursor-pointer text-lg"
                      />
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CheckoutTable;