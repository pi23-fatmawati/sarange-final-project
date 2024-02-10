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
  },
});

export const {
  addCartSuccess,
  setTotalCartItems,
  updateCartSuccess,
  deleteCartSuccess,
  incrementCartItem,
  decrementCartItem,
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

export const deleteCart = (id_cart) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
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
  return carts.reduce((total, cartItem) => total + cartItem.quantity, 0);
};

export default cartSlice.reducer;