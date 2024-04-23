/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import WorkoutStack from './WorkoutStack';
import MyWorkoutStack from './MyWorkoutStack';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    tabBar={props => (
      <CustomTabBar
        {...props}
        items={
          props.state.index !== 1
            ? [
                {
                  type: 'regular',
                  text: 'Início',
                  icon: require('../assets/home.png'),
                  route: 'HomeStack',
                },
                {
                  type: 'big',
                  icon: require('../assets/dumbbell.png'),
                  route: 'WorkoutStack',
                },
                {
                  type: 'regular',
                  text: 'Meus Treinos',
                  icon: require('../assets/myworkouts.png'),
                  route: 'MyWorkoutStack',
                },
              ]
            : []
        }
      />
    )}
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen name="HomeStack" component={HomeStack} />
    <Tab.Screen
      name="WorkoutStack"
      component={WorkoutStack}
      options={{
        headerShown: false,
        tabBarStyle: {display: 'none'},
      }}
    />
    <Tab.Screen
      name="MyWorkoutStack"
      component={MyWorkoutStack}
      options={{
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);
