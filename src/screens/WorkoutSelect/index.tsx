/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/elements';

import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {NavigationProps} from '../../interfaces/INavigate';
import {delWorkout} from '../../redux/reducers/userReducer';
import {IWorkout} from '../../interfaces/IWorkout';
import Workout from '../../components/Workout';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  margin: 20px;
`;

const Title = styled.Text`
  color: #000;
  margin-bottom: 10px;
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const {
    myWorkouts,
    lastWorkout,
  }: {myWorkouts: IWorkout[]; lastWorkout: string} = useAppSelector(
    state => state.userReducer,
  );

  const handleBackAction = () => {
    navigation.reset({index: 0, routes: [{name: 'AppTab'}]});
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBackButton onPress={handleBackAction} />,
      headerLeftContainerStyle: {
        marginRight: 10,
      },
    });
  }, []);

  const goWorkout = (workout: IWorkout) => {
    navigation.navigate('WorkoutChecklist', {workout});
  };

  let lastWorkoutItem: any = false;
  if (lastWorkout) {
    lastWorkoutItem = myWorkouts.find(i => i.id === lastWorkout);
  }
  return (
    <Container>
      {lastWorkoutItem && (
        <>
          <Title>Seu último treino foi:</Title>
          <Workout data={lastWorkoutItem} />
        </>
      )}

      <Title>Escola seu treino de hoje:</Title>
      <FlatList
        style={styles.workoutList}
        data={myWorkouts}
        renderItem={({item}) => (
          <Workout data={item} goAction={() => goWorkout(item)} />
        )}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  workoutList: {
    flex: 1,
  },
});
