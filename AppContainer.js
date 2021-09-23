import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { retrieveToken } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screen/Home";
import Login from "./screen/Login";
import SplashScreen from "./screen/SplashScreen";
import Examens from "./screen/Examens";
import Planning from "./screen/Planning";

const Stack = createNativeStackNavigator();

export default AppContainer = () => {
  const isLoading = useSelector((state) => state.AuthReducer.isLoading);
  const userToken = useSelector((state) => state.AuthReducer.token);
  const dispatch = useDispatch();

  async function fetchToken() {
    const access_token = await SecureStore.getItemAsync("access_token");
    dispatch(retrieveToken(access_token));
  }

  useEffect(() => {
    fetchToken();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {userToken == null ? (
            <>
              <Stack.Screen name="Connexion" component={Login} />
            </>
          ) : (
            <>
              <Stack.Screen name="Accueil" component={Home} />
              {userToken == "ROLE_USER" ? (
                <>
                  <Stack.Screen name="Planning" component={Planning} />
                </>
              ) : (
                <>
                  <Stack.Screen name="Examens" component={Examens} />
                </>
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
