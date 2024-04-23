import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WorkoutSelect from '../screens/WorkoutSelect';
import WorkoutChecklist from '../screens/WorkoutChecklist';

export const MainStack = createNativeStackNavigator();

export default () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="WorkoutSelect"
      component={WorkoutSelect}
      options={{
        title: 'Escolha seu treino',
        headerTitleAlign: 'center',
        contentStyle: {
          backgroundColor: '#fff',
        },
      }}
    />
    <MainStack.Screen
      name="WorkoutChecklist"
      component={WorkoutChecklist}
      options={{headerShown: false, contentStyle: {width: '100%'}}}
    />
  </MainStack.Navigator>
);
