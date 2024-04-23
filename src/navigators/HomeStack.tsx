import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import HomeConfig from '../screens/HomeConfig';

export const HomeStack = createNativeStackNavigator();

export default () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        title: '',
        contentStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Seu progresso diário',
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name="HomeConfig"
        component={HomeConfig}
        options={{title: 'Configurações', headerTitleAlign: 'center'}}
      />
    </HomeStack.Navigator>
  );
};
