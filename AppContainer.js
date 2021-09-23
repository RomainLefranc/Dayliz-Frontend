import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { retrieveToken, logout } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import * as SecureStore from "expo-secure-store";

import Home from "./screen/Home";
import Login from "./screen/Login";
import SplashScreen from "./screen/SplashScreen";
import Examens from "./screen/Examens";
import Planning from "./screen/Planning";

const Stack = createNativeStackNavigator();

export default AppContainer = () => {
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getToken() {
      await SecureStore.getItemAsync("access_token").then((token) =>
        dispatch(retrieveToken(token))
      );
    }
    getToken();
  }, []);
  async function deleteToken() {
    await SecureStore.deleteItemAsync("access_token").then(() =>
      dispatch(logout())
    );
  }
  if (authState.isLoading) {
    return <SplashScreen />;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {authState.token == null ? (
            <>
              <Stack.Screen name="Connexion" component={Login} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Accueil"
                component={Home}
                options={{
                  headerRight: () => (
                    <Button
                      onPress={() => deleteToken()}
                      title="Déconnexion"
                      color="#000"
                    />
                  ),
                }}
              />
              {authState.role == "ROLE_USER" ? (
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
