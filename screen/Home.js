import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

export default Home = ({ navigation }) => {
  const authState = useSelector((state) => state.AuthReducer);

  return (
    <View style={styles.container}>
      <Text>{authState.role == 1 ? "Administrateur" : ""}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
