import {View, Text, ScrollView, FlatList} from 'react-native';
import Loading from './Loading';
import User from './User';
import React, {useEffect, useState} from 'react';

export default UserList = () => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://dayliz.herokuapp.com/api/users')
      .then(response => response.json())
      .then(json => {
        setUsers(json);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        height: 300,
        backgroundColor: '#B0BEC5',
        margin: 5,
        borderRadius: 10,
        padding: 15,
      }}>
      <Text
        style={{
          marginBottom: 5,
        }}>
        Utilisateurs
      </Text>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <FlatList
            style={{flex: 1, height: '100%'}}
            data={users}
            renderItem={user => <User user={user.item}></User>}
            keyExtractor={user => user.id}
          />
        </ScrollView>
      )}
    </View>
  );
};
