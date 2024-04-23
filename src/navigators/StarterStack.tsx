import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StarterIntro from '../screens/StarterIntro';
import StarterName from '../screens/StarterName';
import StarterDias from '../screens/StarterDias';
import StarterNivel from '../screens/StarterNivel';
import StarterRecommendations from '../screens/StarterRecommendations';

export const MainStack = createNativeStackNavigator();

export default () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <MainStack.Screen
      name="StarterIntro"
      options={{
        contentStyle: {
          backgroundColor: '#fff',
        },
      }}
      component={StarterIntro}
    />
    <MainStack.Screen
      name="StarterName"
      component={StarterName}
      options={{
        headerShown: true,
        headerTitle: '',
      }}
    />
    <MainStack.Screen
      name="StarterDias"
      component={StarterDias}
      options={{
        headerShown: true,
        headerTitle: '',
      }}
    />
    <MainStack.Screen
      name="StarterNivel"
      component={StarterNivel}
      options={{
        headerShown: true,
        headerTitle: '',
      }}
    />
    <MainStack.Screen
      name="StarterRecommendations"
      component={StarterRecommendations}
      options={{
        headerShown: true,
        headerTitle: '',
      }}
    />
  </MainStack.Navigator>
);
