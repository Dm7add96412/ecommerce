import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from './reducers/cartReducer';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

import productApis from "./api/productApis";
import categoriesApi from "./api/categoriesApis";
import authApi from "./api/authApi";
import userApi from "./api/userApi";
import authReducer from "./reducers/authReducer";

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['authReducer']
}

const rootReducer = combineReducers({
  cartReducer,
  authReducer,
  [productApis.reducerPath]: productApis.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false})
    .concat(productApis.middleware, categoriesApi.middleware, authApi.middleware, userApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)

setupListeners(store.dispatch)
