import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default Examens = () => {
  const [examens, setExamens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO : recuperer la liste des examens
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({});
