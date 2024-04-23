/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList, StyleSheet, StatusBar, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {NavigationProps} from '../../interfaces/INavigate';
import {
  addProgress,
  delWorkout,
  setLastWorkout,
} from '../../redux/reducers/userReducer';
import {IMuscle, IWorkout} from '../../interfaces/IWorkout';
import Workout from '../../components/Workout';
import {RouteProp} from '../../interfaces/IRoute';
import ExerciseItem from '../../components/ExerciseItem';

const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  background-color: #000;
  /* margin: 20px; */
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: rgba(1, 59, 14, 0.9);
`;

const WorkoutHeader = styled.View`
  flex-direction: row;
  width: 90%;
  align-items: center;
  height: 70px;
`;

const WorkoutTitle = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 20px;
`;

const WorkoutClose = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const WorkoutCloseText = styled.Text`
  font-size: 22px;
  color: #fff;
  font-weight: bold;
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp>();
  const {
    myWorkouts,
    lastWorkout,
  }: {myWorkouts: IWorkout[]; lastWorkout: string} = useAppSelector(
    state => state.userReducer,
  );

  const workout: IWorkout = route.params?.workout;
  const [exercises, setExercises] = useState([...workout.exercises]);

  const checkAction = (item: IMuscle, index: number) => {
    let newExercises = [...exercises];

    if (!item.done) {
      newExercises[index].done = true;
    } else {
      newExercises[index].done = false;
    }

    setExercises(newExercises);

    checkWorkout();
  };

  const checkWorkout = () => {
    if (exercises.every(i => i.done)) {
      Alert.alert('PARABÉNS! Você finalizou');

      let today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);

      let thisYear = today.getFullYear();
      let thisMonth: any = today.getMonth() + 1;
      let thisDay: any = today.getDate();
      thisMonth = thisMonth < 10 ? '0' + thisMonth : thisMonth;
      thisDay = thisDay < 10 ? '0' + thisDay : thisDay;
      let dFormated = `${thisYear}-${thisMonth}-${thisDay}`;

      dispatch(addProgress(dFormated));
      dispatch(setLastWorkout(workout.id));

      navigation.reset({index: 0, routes: [{name: 'AppTab'}]});
    }
  };

  return (
    <Container source={require('../../assets/fitness.jpg')}>
      <StatusBar barStyle="light-content" />
      <SafeArea>
        <WorkoutHeader>
          <WorkoutTitle>{workout.name}</WorkoutTitle>
          <WorkoutClose
            onPress={() => navigation.goBack()}
            underlayColor="transparent">
            <WorkoutCloseText>X</WorkoutCloseText>
          </WorkoutClose>
        </WorkoutHeader>
        <FlatList
          style={styles.workoutList}
          data={exercises}
          renderItem={({item, index}) => (
            <ExerciseItem
              data={item}
              index={index}
              checkAction={() => checkAction(item, index)}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </SafeArea>
    </Container>
  );
};

const styles = StyleSheet.create({
  workoutList: {
    width: '90%',
    flex: 1,
  },
});
