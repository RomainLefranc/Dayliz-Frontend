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
import axios from "axios";

const Stack = createNativeStackNavigator();

export default AppContainer = () => {
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getToken() {
      // Récuperation du token dans secure store
      await SecureStore.getItemAsync("access_token").then((token) => {
        if (!token == null) {
          // ajout du token dans le header
          axios.defaults.headers.common["Authorization"] = "bearer " + token;
          // mis à jour du token dans le back
          axios
            .post("https://dayliz.herokuapp.com/api/auth/refresh")
            .then(function (response) {
              let decoded = jwt_decode(response.data.access_token);
              let role = decoded.role;
              async function save() {
                // mis à jour du token dans secure store
                await SecureStore.setItemAsync(
                  "access_token",
                  response.data.access_token
                ).then(() =>
                  dispatch(
                    // mis à jour du token dans le store
                    retrieveToken({
                      token: response.data.access_token,
                      role: role,
                    })
                  )
                );
              }
              save();
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          dispatch(
            retrieveToken({
              token: null,
              role: null,
            })
          );
        }
      });
    }
    getToken();
  }, []);
  async function deleteToken() {
    // Récuperation du token dans secure store
    await SecureStore.getItemAsync("access_token").then((token) => {
      // ajout du token dans le header
      axios.defaults.headers.common["Authorization"] = "bearer " + token;
      // suppression du token dans le back
      axios.post("https://dayliz.herokuapp.com/api/auth/logout").then(() => {
        async function removeToken() {
          // suppression du token dans secure store
          await SecureStore.deleteItemAsync("access_token").then(
            // suppression du token dans le store
            dispatch(logout())
          );
        }
        removeToken();
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
              {authState.role == 2 ? (
                <>
                  <Stack.Screen
                    name="Planning"
                    component={Planning}
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
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Examens"
                    component={Examens}
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
                </>
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
