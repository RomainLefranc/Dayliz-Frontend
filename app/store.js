import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/authSlice";
export default configureStore({
  reducer: { AuthReducer },
});
