import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ActiviteItem = ({ activite }) => {
  return (
    <View
      style={{
        backgroundColor: "#B3E5FC",
        borderRadius: 20,
        margin: 10,
        padding: 10,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <Text style={{ color: "#212121" }}>{activite.title}</Text>
      </View>
      <View
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
        <Text style={{ color: "#212121" }}>
          {activite.duree / 60 / 60 + " min"}
        </Text>
      </View>
    </View>
  );
};

export default ActiviteItem;

const styles = StyleSheet.create({});
