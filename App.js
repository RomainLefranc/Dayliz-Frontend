import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screen/Home";
import Login from "./screen/Login";
import SplashScreen from "./screen/SplashScreen";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();
const AuthContext = React.createContext();

export default App = () => {
  const authContext = React.useMemo(
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

  const AuthReducer = (prevState, action) => {
    switch (action.type) {
      case "SIGNIN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "SIGNOUT":
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  const [state, dispatch] = React.useReducer(AuthReducer, {
    isLoading: true,
    userToken: null,
  });

  useEffect(() => {
    setTimeout(() => {
      authContext.restoreToken();
    }, 2000);
  }, []);

  if (state.isLoading) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <Stack.Screen name="Connexion" component={Login} />
          ) : (
            <Stack.Screen name="Accueil" component={Home} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
