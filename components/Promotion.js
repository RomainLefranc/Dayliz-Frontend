import {Text} from 'react-native';
import React from 'react';
export default Promotion = ({promotion}) => {
  return (
    <Text
      style={{
        backgroundColor: '#E0E0E0',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        padding: 10,
      }}>
      {promotion.name}
    </Text>
  );
};
