import React, { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { retrieveToken } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export default SplashScreen = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    const token = await SecureStore.getItemAsync("access_token");

    if (token == null) {
      dispatch(
        retrieveToken({
          token: null,
          role: null,
          id: null,
        })
      );
      return;
    }

    // ajout du token dans le header
    axios.defaults.headers.common["Authorization"] = "bearer " + token;

    // récuperation des données utilisateur avec le token
    const response = await axios
      .post("https://dayliz.herokuapp.com/api/auth/me")
      .catch(function (error) {
        dispatch(
          retrieveToken({
            token: null,
            role: null,
            id: null,
          })
        );
        return;
      });

    const role = response.data.user.role_id;
    const userId = response.data.user.id;
    await SecureStore.setItemAsync("access_token", token);
    dispatch(
      // mis à jour du token dans le store
      retrieveToken({
        token: token,
        role: role,
        userId: userId,
      })
    );
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require("../assets/react.png")}
        className="h-60 self-center"
        style={styles.img}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#81D4FA" />
    </View>
  );
};
