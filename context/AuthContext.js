import React from "react";
import * as SecureStore from "expo-secure-store";
export const AuthContext = React.createContext();

export const authContext = React.useMemo(
  () => ({
    signIn: async (token) => {
      try {
        token = await SecureStore.setItemAsync("usertoken", token);
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: "SIGNIN", token: "test" });
    },
    signOut: async () => {
      try {
        await SecureStore.deleteItemAsync("usertoken");
      } catch (error) {
        console.log(error);
      }
      SecureStore.deleteItemAsync("usertoken");
      dispatch({ type: "SIGNOUT" });
    },
    restoreToken: async () => {
      token = null;
      try {
        token = await SecureStore.getItemAsync("usertoken");
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token });
    },
  }),
  []
);
