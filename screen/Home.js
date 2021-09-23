import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Button, View } from "react-native";

export default Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Navigation test" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
