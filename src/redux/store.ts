import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from './reducers/cartReducer';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

import productApis from "./api/productApis";
import categoriesApi from "./api/categoriesApis";
import authApi from "./api/authApi";

const persistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartReducer']
}

const rootReducer = combineReducers({
  cartReducer,
  [productApis.reducerPath]: productApis.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [authApi.reducerPath]: authApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false})
    .concat(productApis.middleware, categoriesApi.middleware, authApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)

setupListeners(store.dispatch)
