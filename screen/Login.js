import React, { useState } from "react";
import {
  Image,
  StyleSheet,
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

export default Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const submit = () => {
    setIsLoading(true);
    axios
      .post("https://dayliz.herokuapp.com/api/auth/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        let decoded = jwt_decode(response.data.access_token);
        let role = decoded.role;
        async function save() {
          await SecureStore.setItemAsync(
            "access_token",
            response.data.access_token
          ).then(() =>
            dispatch(
              login({
                token: response.data.access_token,
                role: role,
              })
            )
          );
        }
        save();
      })
      .catch(function (error) {
        alert(error);
        setIsLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Image
          source={require("../assets/react.png")}
          style={styles.img}
          resizeMode="contain"
        />
        <View style={styles.inputView}>
          <Text style={styles.labelInput}>Email</Text>
          <TextInput
            style={styles.TextInput}
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.labelInput}>Mot de passe</Text>
          <TextInput
            style={styles.TextInput}
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => submit()}
          disabled={isLoading}
        >
          <Text>Connexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  inputView: {
    width: "100%",
    marginBottom: 20,
  },
  TextInput: {
    paddingLeft: 10,
    height: 45,
    backgroundColor: "#c9c9c9",
    borderRadius: 10,
  },
  labelInput: { marginBottom: 5 },
  loginBtn: {
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    backgroundColor: "#03A9F4",
    padding: 10,
  },
  form: {
    width: "90%",
    alignItems: "flex-start",
  },
  img: {
    height: 250,
    alignSelf: "center",
  },
});
