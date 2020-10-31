import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';

const Stack = createStackNavigator();

const FovoritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Fovorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default FovoritesStack;
