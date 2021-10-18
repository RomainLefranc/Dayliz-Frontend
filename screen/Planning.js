import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ExamenItem from "../components/ExamenItem";
import Loading from "../components/Loading";
import axios from "axios";

export default Planning = () => {
  const [examens, setExamens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authState = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "bearer " + authState.token;
    axios
      .post(
        `https://dayliz.herokuapp.com/api/users/${authState.userId}/examens`
      )
      .then(function (response) {
        setExamens(response.data.examens);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        alert(error.data);
      });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : examens ? (
        <FlatList
          data={examens}
          renderItem={(examen) => <ExamenItem examen={examen.item} />}
          keyExtractor={(examen) => examen.id}
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
    alignItems: "center",
    justifyContent: "center",
  },
});
