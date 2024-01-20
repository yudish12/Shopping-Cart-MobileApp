import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar} from 'react-native';
import Cart from './screens/Cart';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Product from './screens/Product';
import Home from './screens/Home';
import BottomBar from './components/BottomBar';
import CartProvider from './context';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CartProvider>
      <SafeAreaView style={{flex: 1, position: 'relative'}}>
        <StatusBar
          // backgroundColor={currentTheme.colors.background}
          // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          animated
        />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{headerShown: false}}
            tabBar={props => <BottomBar {...props} />}
            initialRouteName="home">
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="product" component={Product} />
            <Tab.Screen name="cart" component={Cart} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </CartProvider>
  );
}
