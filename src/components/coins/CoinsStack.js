import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from './CointsScreen';
import CoinDetailScreen from '../coinDetail/CoinsDeailsScreen';
import Colors from 'cryptoTracker/src/res/colors';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    // padres
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowColor: Colors.blackPearl
        },
        headerTintColor: Colors.white
      }}
    >

      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="CoinsDetails" component={CoinDetailScreen} />

    </Stack.Navigator>
  );
};

export default CoinsStack;
