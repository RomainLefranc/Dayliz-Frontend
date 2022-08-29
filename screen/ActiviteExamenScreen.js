import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ExamenItem from "../components/ExamenItem";
import axios from "axios";
import ActiviteItem from "../components/ActiviteItem";

export default ActiviteExamenScreen = ({ route, navigation }) => {
  const [activites, setActivites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authState = useSelector((state) => state.AuthReducer);
  const [errors, setErrors] = useState(null);

  const { examenId } = route.params;
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "bearer " + authState.token;
    axios
      .get(`https://dayliz.herokuapp.com/api/examens/${examenId}/activities`)
      .then((response) => {
        setActivites(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setErrors(error.response.data.error);
      });
  }, [examenId]);

  return (
    <View className="flex-1 flex-col justify-center">
      {isLoading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : activites.length != 0 ? (
        <FlatList
          className="p-4"
          data={activites}
          renderItem={(activite) => <ActiviteItem activite={activite.item} />}
          keyExtractor={(activite) => activite.id.toString()}
        />
      ) : (
        <Text className="text-black">Aucunes activités</Text>
      )}
      {errors && <Text className="text-red-600 text-xs">{errors}</Text>}
    </View>
  );
};
