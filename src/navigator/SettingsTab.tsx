import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {Preference} from '../screens/preference/preference';
import {UpdatePreference} from '../screens/updatePreference/updatePreference';
import {NAVIGATION_SCREEN} from './navigationTypes';

export const SettingsTab = () => {
  type NavParams = {
    [NAVIGATION_SCREEN.UPDATE_PREFERENCE]: {type?: string};
    [NAVIGATION_SCREEN.PREFERENCE]: undefined;
  };

  const Stack = createNativeStackNavigator<NavParams>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        component={Preference}
        name={NAVIGATION_SCREEN.PREFERENCE}
        options={{
          headerShown: true,
        }}
      />

      <Stack.Screen
        component={UpdatePreference}
        name={NAVIGATION_SCREEN.UPDATE_PREFERENCE}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
