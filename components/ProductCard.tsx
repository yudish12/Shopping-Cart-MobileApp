/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {CartContext, ProductType} from '../context';
import {useNavigation} from '@react-navigation/native';

const ProductCard = ({product}: {product: ProductType}) => {
  const navigation = useNavigation<{
    navigate(
      arg0: string,
      arg1?: {productId: number} | {product: ProductType},
    ): void;
    productId: number;
  }>();

  const state = useContext(CartContext);

  const handlePress = () => {
    state?.addToCart(product);
    navigation.navigate('cart');
  };

  return (
    <Pressable
      onPress={() => navigation.navigate('product', {productId: product.id})}
      style={styles.cardContainer}>
      <View style={styles.innerContainer}>
        <View>
          <Icon style={styles.heartIcons} name="heart" />
        </View>
        <View style={{alignItems: 'center', padding: 10}}>
          <Image
            style={{width: 100, height: 100, borderRadius: 12}}
            source={{
              uri: product.images[0],
            }}
          />
        </View>
        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>
              ${`${product.price}`}
            </Text>
            <Pressable onPress={handlePress}>
              <Icon
                style={{fontSize: 30, color: '#2A4BA0'}}
                name="pluscircle"
              />
            </Pressable>
          </View>
          <Text style={{fontSize: 15, fontWeight: '500'}}>
            {`${product.title}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '45%',
    borderRadius: 10,
    backgroundColor: '#E7ECF0',
    marginTop: 20,
    marginRight: 20,
  },
  heartIcons: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
    color: '#FF8181',
  },
  ImageIcons: {
    fontSize: 80,
    fontWeight: '300',
  },
  innerContainer: {
    justifyContent: 'center',
  },
});
