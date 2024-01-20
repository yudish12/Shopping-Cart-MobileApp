/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icons from 'react-native-vector-icons/AntDesign';
import ProductCard from '../components/ProductCard';
import {ProductType} from '../context';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductType[] | []>([]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://dummyjson.com/products');
      const resp = await res.json();
      if (res.status === 200) {
        setProducts(resp.products);
      } else {
        throw new Error('Something Went Wrong');
      }
    } catch (error) {
      console.log(error);
      Alert.alert(`Error:${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={styles.HomeContainer}>
      <View style={styles.PuprpleContainer}>
        <Text style={styles.PurpleContainerText}>Hey Rahul</Text>
        <View style={styles.inputBox}>
          <Icons style={styles.placeHolderIcon} name="search1" />
          <TextInput
            style={styles.TextInput}
            placeholder="Search Products or Store"
            placeholderTextColor={'#8891A5'}
          />
        </View>
        <View style={styles.purpleBottom}>
          <View>
            <Text style={{color: '#8891A5'}}>Delivery To</Text>
            <Text style={{color: 'white'}}>Green Way 3000, Sylhet</Text>
          </View>
          <View>
            <Text style={{color: '#8891A5'}}>WITHIN</Text>
            <Text style={{color: 'white'}}>1 Hour</Text>
          </View>
        </View>
      </View>
      <View style={styles.WhiteContainer}>
        <View style={styles.discountCard}>
          <Icons name="picture" style={{color: 'white', fontSize: 80}} />
          <View>
            <Text style={{color: 'white', fontSize: 25, fontWeight: '300'}}>
              Get
            </Text>
            <Text style={{color: 'white', fontSize: 30, fontWeight: '800'}}>
              50% OFF
            </Text>
            <Text style={{color: 'white', fontSize: 25, fontWeight: '300'}}>
              On first order
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontWeight: '400',
            marginTop: 10,
            fontSize: 30,
            color: '#1E222B',
          }}>
          Recommended
        </Text>
        <View style={styles.listView}>
          {loading ? (
            <ActivityIndicator />
          ) : products.length ? (
            <FlatList
              data={products}
              renderItem={({item}: {item: ProductType}) => (
                <ProductCard product={item} />
              )}
              numColumns={2}
              keyExtractor={(item: ProductType) => item.id.toString()}
            />
          ) : (
            <View />
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
  },
  PuprpleContainer: {
    padding: 10,
    height: '30%',
    backgroundColor: '#2A4BA0',
  },
  PurpleContainerText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 30,
    marginTop: 10,

    marginLeft: 30,
  },
  inputBox: {
    borderRadius: 10000,
    backgroundColor: '#153075',
    marginTop: 30,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    color: 'white',
  },
  placeHolderIcon: {
    color: '#8891A5',
    marginLeft: 10,
    fontSize: 20,
  },
  TextInput: {
    marginLeft: 10,
  },
  purpleBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-end',
  },
  WhiteContainer: {
    padding: 20,
    flex: 1,
  },
  discountCard: {
    backgroundColor: '#F9B023',
    flexDirection: 'row',
    padding: 20,
    width: '85%',
    borderRadius: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listView: {
    marginTop: 10,
    flex: 1,
    paddingBottom: 90,
  },
});
