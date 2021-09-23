import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/authSlice";
export default configureStore({
  reducer: { AuthReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
