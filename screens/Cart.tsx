/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {CartContext} from '../context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import OctIcon from 'react-native-vector-icons/Octicons';

const Cart = () => {
  const context = useContext(CartContext);
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        justifyContent: 'space-between',
        height: '85%',
        padding: 20,
      }}>
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
          <View style={{width: 50}} />
          <Text style={styles.HeadText}>
            Shopping Cart {`(${context?.cartProducts.totalQuantity})`}
          </Text>
        </View>
        {context?.cartProducts.cartProducts.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 120,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: 'black',
              }}>
              Cart is Empty!!
            </Text>
          </View>
        ) : (
          <></>
        )}
        <ScrollView
          contentContainerStyle={{
            padding: 10,
            marginTop: 10,
          }}>
          {context?.cartProducts.cartProducts.map(e => (
            <View
              key={e.id}
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Image
                  style={{width: 70, height: 70, borderRadius: 12}}
                  source={{
                    uri: e?.images[0],
                  }}
                />
                <View
                  style={{
                    marginLeft: 20,
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                    {e.title}
                  </Text>
                  <Text
                    style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                    ${e.price}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable onPress={() => context.addToCart(e)}>
                  <OctIcon
                    style={{
                      color: 'black',
                      borderRadius: 5,
                      padding: 5,
                      fontSize: 20,
                      marginRight: 10,
                      backgroundColor: '#E7ECF0',
                    }}
                    name="plus"
                  />
                </Pressable>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                  }}>
                  {e.quantity}
                </Text>
                <Pressable onPress={() => context.removeFromCart(e)}>
                  <OctIcon
                    style={{
                      color: 'black',
                      borderRadius: 5,
                      padding: 5,
                      fontSize: 20,
                      marginLeft: 10,
                      backgroundColor: '#E7ECF0',
                    }}
                    name="dash"
                  />
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '400',
            }}>
            Subtotal
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '400',
            }}>
            ${context?.cartProducts.totalPrice}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            marginTop: 25,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '400',
            }}>
            Delivery
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '400',
            }}>
            ${context?.cartProducts.DeliveryPrice}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            marginTop: 25,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '400',
            }}>
            Total
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '400',
            }}>
            ${context?.cartProducts.totalPrice}
          </Text>
        </View>
        <Pressable
          style={{
            paddingHorizontal: 30,
            backgroundColor: '#2A4BA0',
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            borderRadius: 99999,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Proceed To Checkout
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  HeadText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
});
