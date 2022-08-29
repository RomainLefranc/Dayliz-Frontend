import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ExamenItem from "../components/ExamenItem";
import axios from "axios";

export default ExaminateurHomeScreen = ({ navigation }) => {
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
    <View className="flex-1 justify-center ">
      {isLoading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : examens.length != 0 ? (
        <FlatList
          className="p-4"
          data={examens}
          renderItem={(examen) => (
            <ExamenItem navigation={navigation} examen={examen.item} />
          )}
          keyExtractor={(examen) => examen.id.toString()}
        />
      ) : (
        <Text>Aucuns examens</Text>
      )}
    </View>
  );
};
