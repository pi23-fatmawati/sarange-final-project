import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/user-slice";
import cartReducer from "../slice/cart-slice";
import registerReducer from "../slice/register-slice";
import productReducer from "../slice/product-slice";
import loginReducer from '../slice/login-slice';
import authReducer from '../slice/auth-slice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer.user,
    user_basic_info: userReducer.user_basic_info,
    product: productReducer,
    register: registerReducer,
    login: loginReducer,
    auth: authReducer,
  },
});

export default store;