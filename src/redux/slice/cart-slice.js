import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalCartItems: 0,
    selectedItems: {},
  },
  reducers: {
    addCartSuccess(state, action) {
      const cartItem = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === cartItem.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({ ...cartItem, quantity: 1 });
      }
    },
    setTotalCartItems(state, action) {
      state.totalCartItems = action.payload;
    },
    updateCartSuccess(state, action) {
      state.cartItems = action.payload;
    },
    deleteCartSuccess(state, action) {
      const deletedProductId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== deletedProductId
      );
      state.totalCartItems = calculateTotalProducts(state.cartItems);
    },
    incrementCartItem(state, action) {
      const id_cart = action.payload;
      const cartItem = state.cartItems.find((item) => item.id_cart === id_cart);

      if (cartItem && cartItem.total_product < 999) {
        cartItem.total_product += 1;
      }
    },
    decrementCartItem(state, action) {
      const id_cart = action.payload;
      const cartItem = state.cartItems.find((item) => item.id_cart === id_cart);

      if (cartItem && cartItem.total_product > 1) {
        cartItem.total_product -= 1;
      }
    },
    updateSelectedItems(state, action) {
      state.selectedItems = {
        ...state.selectedItems,
        ...action.payload,
      };
    },
  },
});

export const {
  addCartSuccess,
  setTotalCartItems,
  updateCartSuccess,
  deleteCartSuccess,
  incrementCartItem,
  decrementCartItem,
  updateSelectedItems,
} = cartSlice.actions;

export const addCart = (id_product) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "https://final-sarange-eff62c954ab5.herokuapp.com/cart",
        { id_product },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      dispatch(addCartSuccess(response.data));
      dispatch(updateCart());
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "https://final-sarange-eff62c954ab5.herokuapp.com/cart",
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      const { carts } = response.data;
      dispatch(updateCartSuccess(carts));
      dispatch(setTotalCartItems(calculateTotalProducts(carts)));
    } catch (error) {
      console.error("Error fetching cart data, ", error);
    }
  };
};

export const deleteCart = (id_cart) => {
  return async (dispatch) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(
        `https://final-sarange-eff62c954ab5.herokuapp.com/cart/${id_cart}`,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      dispatch(deleteCartSuccess(id_cart));
      dispatch(updateCart());
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };
};

const calculateTotalProducts = (carts) => {
  return carts.reduce((total, cartItem) => total + cartItem.total_product, 0);
};

export const updateCartData = () => {
  return async (dispatch, getState) => {
    try {
      const token = Cookies.get("token");
      const { cart } = getState();
      if (!cart) {
        console.error("Cart state is undefined or null");
        return [];
      } 
      const { cartItems, selectedItems } = cart;
      console.log("cart items:", cartItems);
      const payload = cartItems.map((cartItem) => ({
        id_cart: cartItem.id_cart,
        total_product: cartItem.total_product,
        is_check: selectedItems[cartItem.id_cart] || false,
      }));

      const response = await axios.patch(
        "https://final-sarange-eff62c954ab5.herokuapp.com/cart",
        { cartItems: payload },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      const { updatedCartItems } = response.data;

      dispatch(updateCartSuccess(updatedCartItems));
      return updatedCartItems;
    } catch (error) {
      console.error("Error updating cart data, ", error);
      return [];
    }
  };
};

export default cartSlice.reducer;
