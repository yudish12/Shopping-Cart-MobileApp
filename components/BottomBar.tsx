/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const BottomBar = (props: BottomTabBarProps) => {
  const {state, descriptors, navigation} = props;
  return (
    <View style={styles.bottomBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        if (isFocused) {
          return (
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <View style={styles.focussedOuter}>
                <View style={styles.focussedInner}>
                  {route.name === 'home' ? (
                    <Icons
                      name="home"
                      style={{color: '#E0B420', fontSize: 26}}
                    />
                  ) : route.name === 'product' ? (
                    <Icons
                      name="bag-check"
                      style={{color: '#E0B420', fontSize: 26}}
                    />
                  ) : (
                    <Icons
                      name="cart"
                      style={{color: '#E0B420', fontSize: 26}}
                    />
                  )}

                  <Text style={{color: 'white'}}>{label.toString()}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            {route.name === 'home' ? (
              <Icons name="home" style={{color: '#000000', fontSize: 26}} />
            ) : route.name === 'product' ? (
              <Icons
                name="bag-check"
                style={{color: '#000000', fontSize: 26}}
              />
            ) : (
              <Icons name="cart" style={{color: '#000000', fontSize: 26}} />
            )}
            <Text style={{color: '#222'}}>{label.toString()}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bottomBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#E7ECF0',
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focussedOuter: {
    backgroundColor: 'white',
    borderRadius: 1000000,
    width: 80,
    zIndex: 20,
    height: 80,
    position: 'absolute',
    padding: 3,
    top: -70,
  },
  focussedInner: {
    backgroundColor: '#1B262E',
    borderRadius: 1000000,
    justifyContent: 'center',
    padding: 2,
    alignItems: 'center',
    width: 70,
    height: 70,
  },
});
