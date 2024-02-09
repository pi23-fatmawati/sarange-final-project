import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/user-slice';
import cartReducer from '../slice/cart-slice';
import registerReducer from '../slice/register-slice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    register: registerReducer,
  },
});

export default store;