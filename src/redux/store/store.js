import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slice/cart-slice';
import registerReducer from '../slice/register-slice';
import loginReducer from '../slice/login-slice';
import authReducer from '../slice/auth-slice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    register: registerReducer,
    login: loginReducer,
    auth: authReducer,
  },
});

export default store;