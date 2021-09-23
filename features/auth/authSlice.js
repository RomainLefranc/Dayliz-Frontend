import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };
    },
    logout: (state) => {
      return {
        ...state,
        token: null,
        isLoading: false,
      };
    },
    retrieveToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, retrieveToken } = authSlice.actions;

export default authSlice.reducer;
