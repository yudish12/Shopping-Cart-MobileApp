/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Anticon from 'react-native-vector-icons/AntDesign';
import Rating from '../components/Rating';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CartContext, ProductType} from '../context';

const Product = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  // Accessing params from the route
  //@ts-ignore
  const productId = route.params?.productId;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(false);
  let discPrice;
  if (product?.price && product.discountPercentage) {
    discPrice = (product?.price * product?.discountPercentage) / 100;
  }

  const getProductInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      const resp = await res.json();
      if (res.status === 200) {
        setProduct(resp);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const state = useContext(CartContext);
  const isFav = state?.favProducts.find(e => e.id === product?.id);

  const handlePress = () => {
    if (product) {
      state?.addToCart(product);
    }
    navigation.navigate('cart');
  };

  useEffect(() => {
    if (productId) {
      getProductInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator style={{width: 200, height: 200}} />
      </View>
    );
  }

  if (!product) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: 'black',
          }}>
          Please Select a product from home page
        </Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.topIcons}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            style={{
              color: 'black',
              borderRadius: 99999,
              fontSize: 30,
              backgroundColor: '#E7ECF0',
            }}
            name="chevron-back"
          />
        </Pressable>
        {/* @ts-ignore */}
        <Pressable
          style={{position: 'relative'}}
          onPress={() => navigation.navigate('cart')}>
          <Icon
            style={{
              color: 'black',
              borderRadius: 99999,
              fontSize: 30,
              backgroundColor: '#E7ECF0',
            }}
            name="bag-outline"
          />
          <Text
            style={{
              position: 'absolute',
              backgroundColor: '#F9B023',
              color: 'white',
              padding: 2,
              paddingHorizontal: 7,
              right: -10,
              top: -10,
              borderRadius: 99999,
            }}>
            {state?.cartProducts.totalQuantity}
          </Text>
        </Pressable>
      </View>
      <View style={styles.TextContainer}>
        <Text style={styles.ThinText}>{product?.title}</Text>
        <Text style={styles.ThickText}>{product?.brand}</Text>
      </View>
      <View>
        <Rating rating={product?.rating} />
      </View>
      <View style={styles.imageContainer}>
        <Pressable
          style={styles.favIconContainer}
          onPress={() =>
            !isFav ? state?.addToFav(product) : state?.removeFromFav(product)
          }>
          <Anticon
            style={isFav ? styles.heartIconsYes : styles.heartIconsNo}
            name={!isFav ? 'hearto' : 'heart'}
          />
        </Pressable>
        <Image
          style={{width: 300, height: 300, borderRadius: 12}}
          source={{
            uri: product?.images[1],
          }}
        />
      </View>
      <View style={styles.details}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '500', color: '#2A4BA0'}}>
            {' '}
            ${product?.price}{' '}
          </Text>
          <View
            style={{
              marginLeft: 10,
              backgroundColor: '#2A4BA0',
              paddingHorizontal: 10,
              borderRadius: 12,
            }}>
            <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>
              $ {discPrice && Math.floor(discPrice)} Off
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Pressable
            onPress={handlePress}
            style={{
              padding: 14,
              borderWidth: 2,
              marginTop: 20,
              alignItems: 'center',
              width: 150,
              borderColor: '#2A4BA0',
              borderRadius: 16,
            }}>
            <Text style={{fontSize: 20, fontWeight: '400', color: '#2A4BA0'}}>
              Add To Cart
            </Text>
          </Pressable>
          <View style={{width: 40}} />
          <Pressable
            style={{
              padding: 14,
              marginTop: 20,
              width: 150,
              alignItems: 'center',
              backgroundColor: '#2A4BA0',
              borderRadius: 16,
            }}>
            <Text style={{fontSize: 20, fontWeight: '400', color: 'white'}}>
              Buy Now
            </Text>
          </Pressable>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
            Details
          </Text>
          <Text style={{fontSize: 16, fontWeight: '400'}}>
            {product?.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  topIcons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
  },
  TextContainer: {
    paddingHorizontal: 22,
  },
  ThinText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '300',
  },
  ThickText: {
    fontSize: 30,
    color: 'black',
    fontWeight: '600',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  favIconContainer: {
    position: 'absolute',
    right: 70,
    top: 0,
    zIndex: 20,
  },
  heartIconsYes: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
    color: '#FF8181',
  },
  heartIconsNo: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  details: {
    padding: 20,
  },
});
