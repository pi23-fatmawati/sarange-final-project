import { Tuple, combineReducers, configureStore, createAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '../slice/cart-slice';
import registerReducer from '../slice/register-slice';
import loginReducer from '../slice/login-slice';
import productReducer from "../slice/product-slice";
import authReducer from '../slice/auth-slice';
import userReducer from "../slice/user-slice";
// import { thunk } from 'redux-thunk';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['register', 'login', 'auth'],
  serialize: true,
  deserialize: true,
}

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer.user,
    user_basic_info: userReducer.user_basic_info,
    product: productReducer,
    register: registerReducer,
    login: loginReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(logger)
  // middleware: () => new Tuple(thunk, logger),
})

export const persistor = persistStore(store)

export default store;
