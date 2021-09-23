import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { retrieveToken, logout } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
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
    dispatch(retrieveToken());
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
              <Stack.Screen
                name="Accueil"
                component={Home}
                options={{
                  headerRight: () => (
                    <Button
                      onPress={() => dispatch(logout())}
                      title="Déconnexion"
                      color="#000"
                    />
                  ),
                }}
              />
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
