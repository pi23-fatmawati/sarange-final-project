import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/user-slice";
import cartReducer from "../slice/cart-slice";
import registerReducer from "../slice/register-slice";
import productReducer from "../slice/product-slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    product: productReducer,
    register: registerReducer,
  },
});

export default store;
