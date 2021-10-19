import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ExamenItem from "../components/ExamenItem";
import axios from "axios";

export default ExaminateurHomeScreen = () => {
  const [examens, setExamens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authState = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "bearer " + authState.token;
    axios
      .get(`https://dayliz.herokuapp.com/api/examens`)
      .then(function (response) {
        setExamens(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        alert(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#81D4FA" />
      ) : examens.length != 0 ? (
        <FlatList
          style={{ width: "100%" }}
          data={examens}
          renderItem={(examen) => <ExamenItem examen={examen.item} />}
          keyExtractor={(examen) => examen.id.toString()}
        />
      ) : (
        <Text>Aucuns examens</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
