import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyWorkouts from '../screens/MyWorkouts';
import EditWorkout from '../screens/EditWorkout';

export const MyWorkoutStack = createNativeStackNavigator();

export default () => (
  <MyWorkoutStack.Navigator
    screenOptions={{
      headerShown: true,
      contentStyle: {
        backgroundColor: '#fff',
      },
    }}>
    <MyWorkoutStack.Screen
      name="MyWorkouts"
      component={MyWorkouts}
      options={{title: 'Meus Treinos', headerTitleAlign: 'center'}}
    />
    <MyWorkoutStack.Screen name="EditWorkout" component={EditWorkout} />
  </MyWorkoutStack.Navigator>
);
