import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from './reducers/cartReducer';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

import productApis from "./api/productApis";

// const preCartReducer = JSON.parse(localStorage.getItem('cart')||'[]')

/* export const store = configureStore({
  reducer: {
    productsReducer,
    usersReducer,
    cartReducer
  },
  preloadedState: {
    cartReducer: preCartReducer
  }
}); */

const persistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartReducer']
}

const rootReducer = combineReducers({
  cartReducer,
  [productApis.reducerPath]: productApis.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(productApis.middleware)
})

/* const updateLocalStorage = () => {
  const cart = store.getState().cartReducer
  localStorage.setItem('cart', JSON.stringify(cart))
} */

// store.subscribe(updateLocalStorage)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)

setupListeners(store.dispatch)

// export default store