import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Preload from '../screens/Preload';
import StarterStack from './StarterStack';
import AppTab from './AppTab';

export const MainStack = createNativeStackNavigator();

export default () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Preload">
    <MainStack.Screen name="Preload" component={Preload} />
    <MainStack.Screen name="StarterStack" component={StarterStack} />
    <MainStack.Screen name="AppTab" component={AppTab} />
  </MainStack.Navigator>
);
