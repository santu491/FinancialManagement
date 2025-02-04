import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Charts} from '../screens/charts/charts';

export const ChartTab = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen component={Charts} name="Chart" />
    </Stack.Navigator>
  );
};
