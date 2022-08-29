import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { logout } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./screen/LoginScreen";
import SplashScreen from "./screen/SplashScreen";
import ExaminateurHomeScreen from "./screen/ExaminateurHomeScreen";
import ApprenantHomeScreen from "./screen/ApprenantHomeScreen";
import ActiviteExamenScreen from "./screen/ActiviteExamenScreen";

const Stack = createNativeStackNavigator();

export default AppContainer = () => {
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  function deconnexion() {
    return (
      <Ionicons
        name="log-out-outline"
        size={24}
        color="black"
        onPress={() => deleteToken()}
      />
    );
  }
  function deleteToken() {
    (async () => {
      // suppression du token dans secure store
      await SecureStore.deleteItemAsync("access_token").then(
        // suppression du token dans le store
        dispatch(logout())
      );
    })();
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
              <Stack.Screen name="Connexion" component={LoginScreen} />
            </>
          ) : (
            <>
              {authState.role == 2 ? (
                <>
                  <Stack.Screen
                    name="Planning d'aujourd'hui"
                    component={ApprenantHomeScreen}
                    options={{
                      headerRight: deconnexion,
                    }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Examens"
                    component={ExaminateurHomeScreen}
                    options={{
                      headerRight: deconnexion,
                    }}
                  />
                  <Stack.Screen
                    name="Activites"
                    component={ActiviteExamenScreen}
                    options={{
                      headerRight: deconnexion,
                    }}
                  />
                </>
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
