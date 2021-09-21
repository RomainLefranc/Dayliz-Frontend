import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import PromotionList from '../components/PromotionList';
import UserList from '../components/UserList';
import React from 'react';
import {Button, View} from 'react-native';
export default Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <UserList />
      <PromotionList />
      <Button title="Navigation test" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
