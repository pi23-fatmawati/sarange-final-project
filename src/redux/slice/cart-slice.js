// cart-slice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalCartItems: 0,
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
    removeCart(state, action) {
      const productId = action.payload;
      const existingProductId = state.cartItems.findIndex(
        (item) => item.id === productId
      );

      if (existingProductId !== -1) {
        const existingProduct = state.cartItems[existingProductId];

        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.cartItems.splice(existingProductId, 1);
        }
      }
    },
    setTotalCartItems(state, action) {
      state.totalCartItems = action.payload;
    },
    updateCartSuccess(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const {
  addCartSuccess,
  removeCart,
  setTotalCartItems,
  updateCartSuccess,
} = cartSlice.actions;

export const addCart = (id_product) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
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
      const token = localStorage.getItem("token");
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

const calculateTotalProducts = (carts) => {
  return carts.reduce((total, cartItem) => total + cartItem.quantity, 0);
};

export default cartSlice.reducer;