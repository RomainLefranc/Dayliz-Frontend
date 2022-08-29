import { Pressable, Text } from "react-native";
import React from "react";

export default ExamenItem = ({ examen, navigation }) => {
  return (
    <Pressable
      className="bg-gray-800 flex-1 items-center hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      onPress={() => {
        navigation.navigate("Activites", {
          examenId: examen.id,
        });
      }}
    >
      <Text className="text-white">{examen.title}</Text>
    </Pressable>
  );
};
