import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.labelInput}>Mot de passe</Text>
          <TextInput
            style={styles.TextInput}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => alert("test")}>
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
