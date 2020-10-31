import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';
import Colors from 'cryptoTracker/src/res/colors';

const Stack = createStackNavigator();

const FovoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Fovorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default FovoritesStack;
