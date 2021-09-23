import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

export default SplashScreen = () => {
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