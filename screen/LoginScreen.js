import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";

export default LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();
  const submit = () => {
    setIsLoading(true);
    setErrors(null);
    axios
      .post("https://dayliz.herokuapp.com/api/auth/login", {
        email: email,
        password: password,
      })
      .then(async (response) => {
        const token = response.data.access_token;
        const tokenData = jwt_decode(token);
        const role = tokenData.role;
        const userId = tokenData.userId;
        await SecureStore.setItemAsync("access_token", token).then(() =>
          dispatch(
            login({
              token: token,
              role: role,
              userId: userId,
            })
          )
        );
      })
      .catch(function (error) {
        setIsLoading(false);

        if (error.response.data.error == "Unauthorized") {
          setErrors("Mot de passe ou adresse email invalide");
          return;
        }

        setErrors(error.response.data.error);
      });
  };
  return (
    <View className="flex-1 justify-center bg-white">
      <View className="px-4">
        <Text className="text-5xl mb-9">Dayliz</Text>
        <View className="w-full mb-3">
          <Text className="mb-2">Email</Text>
          <TextInput
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={email}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View className="w-full mb-3">
          <Text className="mb-2">Mot de passe</Text>
          <TextInput
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity
          className="bg-gray-800 w-32 flex-1 items-center hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onPress={() => submit()}
          disabled={isLoading || email == "" || password == ""}
        >
          <Text className="text-white">
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              "Connexion"
            )}
          </Text>
        </TouchableOpacity>

        {errors && <Text className="text-red-600 text-xs">{errors}</Text>}
      </View>
    </View>
  );
};
