import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
export default Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            color: "black",
            textAlign: "center",
          }}
        ></Text>
        <ActivityIndicator
          size="large"
          style={{
            color: "white",
          }}
        ></ActivityIndicator>
      </View>
    </View>
  );
};
