import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    token: null,
    role: null,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        isLoading: false,
      };
    },
    logout: (state) => {
      return {
        ...state,
        token: null,
        role: null,
      };
    },
    retrieveToken: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        isLoading: false,
      };
    },
  },
});

export const { login, logout, retrieveToken } = authSlice.actions;

export default authSlice.reducer;
