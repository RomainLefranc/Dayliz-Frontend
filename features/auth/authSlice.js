import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      async function setToken() {
        await SecureStore.setItemAsync("access_token", action.payload);
      }
      setToken();
      return {
        token: action.payload,
        isLoading: false,
      };
    },
    logout: (state) => {
      async function deleteToken() {
        await SecureStore.deleteItemAsync("access_token");
      }
      deleteToken();
      return {
        token: null,
        isLoading: false,
      };
    },
    retrieveToken: (state) => {
      async function getToken() {
        return await SecureStore.getItemAsync("access_token");
      }
      return {
        token: getToken(),
        isLoading: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, retrieveToken } = authSlice.actions;

export default authSlice.reducer;
