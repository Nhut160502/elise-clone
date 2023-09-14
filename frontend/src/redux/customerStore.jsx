import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import slibarSlice from "../customer/providers/slibarSlice";
import navSlice from "../customer/providers/navSlice";
import cartSlice from "../customer/providers/cartSlice";
import categoriesSlice from "../customer/providers/categoriesSlice";
import typesSlice from "../customer/providers/typesSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  nav: navSlice,
  slibar: slibarSlice,
  cart: cartSlice,
  types: typesSlice,
  categories: categoriesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const customerStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(customerStore);
