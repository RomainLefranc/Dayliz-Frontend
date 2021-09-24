import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import jwt_decode from "jwt-decode";
import { retrieveToken } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default SplashScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      // Récuperation du token dans secure store
      await SecureStore.getItemAsync("access_token").then((token) => {
        if (token != null) {
          // ajout du token dans le header
          axios.defaults.headers.common["Authorization"] = "bearer " + token;
          // mis à jour du token dans le back
          axios
            .post("https://dayliz.herokuapp.com/api/auth/refresh")
            .then(function (response) {
              const token = response.data.access_token;
              const role = jwt_decode(token).role;
              (async () => {
                // mis à jour du token dans secure store
                await SecureStore.setItemAsync("access_token", token).then(() =>
                  dispatch(
                    // mis à jour du token dans le store
                    retrieveToken({
                      token: token,
                      role: role,
                    })
                  )
                );
              })();
            })
            .catch(function (error) {
              alert(error);
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
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/react.png")}
        style={styles.img}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#81D4FA" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  img: {
    height: 250,
    alignSelf: "center",
  },
});
