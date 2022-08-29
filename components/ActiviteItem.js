import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ActiviteItem = ({ activite }) => {
  return (
    <View className="bg-black rounded-md mb-2 p-2">
      <View className="mb-2">
        <Text className="text-white">{activite.title}</Text>
      </View>
      <View
        className="flex-1 "
        style={{
          flex: 1,
          backgroundColor: "#E1F5FE",
          borderRadius: 10,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#212121" }}>{activite.description}</Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#E1F5FE",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text style={{ color: "#212121" }}>{activite.duree / 60 + " min"}</Text>
      </View>
    </View>
  );
};

export default ActiviteItem;

const styles = StyleSheet.create({});
