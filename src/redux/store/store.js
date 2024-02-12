import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '../slice/cart-slice';
import registerReducer from '../slice/register-slice';
import loginReducer from '../slice/login-slice';
import authReducer from '../slice/auth-slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['register', 'login', 'auth'],
  serialize: true,
  deserialize: true,
}

const rootReducer = combineReducers({
    cart: cartReducer,
    register: registerReducer,
    login: loginReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

export default store;