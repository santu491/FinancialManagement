import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Home} from '../screens/home/home';

export const HomeTab = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        component={Home}
        name="Home"
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
