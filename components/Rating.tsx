/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Rating = ({rating}: {rating: number | undefined}) => {
  if (!rating) {
    return <Text>Rating not defined</Text>;
  }

  const numOfStars = Math.min(5, Math.floor(rating));
  const halfStar = rating % 1 !== 0;

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
      }}>
      {[...Array(numOfStars)].map((_, index) => (
        <Icon
          key={index}
          style={{color: '#F9B023', fontSize: 20}}
          name="star"
        />
      ))}
      {halfStar && (
        <Icon style={{color: '#F9B023', fontSize: 20}} name="star-half" />
      )}
      <Text>Rating: {rating}</Text>
    </View>
  );
};

export default Rating;
