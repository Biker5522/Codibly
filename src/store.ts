import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productsApi } from "./redux/apiSlice";
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
