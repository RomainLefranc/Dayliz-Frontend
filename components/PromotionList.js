import {View, Text, ScrollView, FlatList} from 'react-native';
import Loading from './Loading';
import Promotion from './Promotion';
import React, {useEffect, useState} from 'react';

export default PromotionList = () => {
  const [isLoading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch('https://dayliz.herokuapp.com/api/promotions')
      .then(response => response.json())
      .then(json => {
        setPromotions(json);
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
        Promotions
      </Text>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <FlatList
            data={promotions}
            renderItem={promotion => (
              <Promotion promotion={promotion.item}></Promotion>
            )}
            keyExtractor={promotion => promotion.id}
          />
        </ScrollView>
      )}
    </View>
  );
};
