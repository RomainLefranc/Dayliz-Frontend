import { Button, Pressable, Text } from "react-native";
import React from "react";

export default ExamenItem = ({ examen, navigation }) => {
  return (
    <Pressable
      style={{
        backgroundColor: "#03A9F4",
        borderRadius: 20,
        height: 100,
        margin: 10,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        navigation.navigate("Vos activités", {
          examenId: examen.id,
        });
      }}
    >
      <Text>{examen.title}</Text>
    </Pressable>
  );
};
