import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    token: null,
    role: null,
    userId: null,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        isLoading: false,
        userId: action.payload.userId,
      };
    },
    logout: (state) => {
      return {
        ...state,
        token: null,
        role: null,
        userId: null,
      };
    },
    retrieveToken: (state, action) => {
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        isLoading: false,
        userId: action.payload.userId,
      };
    },
  },
});

export const { login, logout, retrieveToken } = authSlice.actions;

export default authSlice.reducer;
