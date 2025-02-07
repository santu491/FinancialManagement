import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Home} from '../screens/home/home';
import {NAVIGATION_SCREEN} from './navigationTypes';
import {CustomDateRange} from '../components/customDateRange/customDateRange';

export const HomeTab = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        component={Home}
        name={NAVIGATION_SCREEN.HOME}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        component={CustomDateRange}
        name={NAVIGATION_SCREEN.CUSTOM_DATE_RANGE}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
