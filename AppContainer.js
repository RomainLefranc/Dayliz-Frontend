import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { logout } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import Login from "./screen/Login";
import SplashScreen from "./screen/SplashScreen";
import Examens from "./screen/Examens";
import Planning from "./screen/Planning";

const Stack = createNativeStackNavigator();

export default AppContainer = () => {
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  async function deleteToken() {
    // Récuperation du token dans secure store
    await SecureStore.getItemAsync("access_token").then((token) => {
      // ajout du token dans le header
      axios.defaults.headers.common["Authorization"] = "bearer " + token;
      // suppression du token dans le back
      axios
        .post("https://dayliz.herokuapp.com/api/auth/logout")
        .then(() => {
          (async () => {
            // suppression du token dans secure store
            await SecureStore.deleteItemAsync("access_token").then(
              // suppression du token dans le store
              dispatch(logout())
            );
          })();
        })
        .catch((error) => {
          alert(error);
        });
    });
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
              {authState.role == 2 ? (
                <>
                  <Stack.Screen
                    name="Planning"
                    component={Planning}
                    options={{
                      headerRight: () => (
                        <Ionicons
                          name="log-out-outline"
                          size={24}
                          color="black"
                          onPress={() => deleteToken()}
                        />
                      ),
                    }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Examens"
                    component={Examens}
                    options={{
                      headerRight: () => (
                        <Ionicons
                          name="log-out-outline"
                          size={24}
                          color="black"
                          onPress={() => deleteToken()}
                        />
                      ),
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
