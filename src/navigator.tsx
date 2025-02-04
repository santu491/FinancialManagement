import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import {HomeTab} from './navigator/homeTab';
import {ChartTab} from './navigator/chartTab';
import {NavigationContainer} from '@react-navigation/native';
import {Transactions} from './screens/transactions/transaction';
import {SettingsTab} from './navigator/SettingsTab';

export const Navigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen component={HomeTab} name="HomeTab" />
        <Tab.Screen
          component={Transactions}
          name="Transactions"
          options={{
            headerShown: true,
          }}
        />
        <Tab.Screen component={ChartTab} name="ChartTab" />
        <Tab.Screen component={SettingsTab} name="Settings" />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
