import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import ActiviteItem from "../components/ActiviteItem";

const ApprenantHomeScreen = () => {
  const [activites, setActivite] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authState = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "bearer " + authState.token;
    axios
      .get(
        `https://dayliz.herokuapp.com/api/users/${authState.userId}/activities`
      )
      .then(function (response) {
        setActivite(response.data.data);
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
      ) : activites.length != 0 ? (
        <View style={styles.liste}>
          <FlatList
            data={activites}
            renderItem={(activite) => <ActiviteItem activite={activite.item} />}
            keyExtractor={(activite) => activite.id.toString()}
          />
        </View>
      ) : (
        <Text>Aucun examen</Text>
      )}
    </View>
  );
};

export default ApprenantHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  liste: {
    height: "100%",
    width: "100%",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
