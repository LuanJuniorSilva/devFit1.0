/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {NavigationProps} from '../../interfaces/INavigate';
import {delWorkout} from '../../redux/reducers/userReducer';
import {IWorkout} from '../../interfaces/IWorkout';
import Workout from '../../components/Workout';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const ButtonArea = styled.TouchableHighlight`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const ButtonImage = styled.Image`
  width: 25px;
  height: 25px;
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const {myWorkouts}: {myWorkouts: IWorkout[]} = useAppSelector(
    state => state.userReducer,
  );

  const AddWorkoutButton = () => {
    return (
      <ButtonArea
        onPress={() => navigation.navigate('EditWorkout')}
        underlayColor="transparent">
        <ButtonImage source={require('../../assets/add.png')} />
      </ButtonArea>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddWorkoutButton />,
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, []);

  const editWorkout = (workout: IWorkout) => {
    navigation.navigate('EditWorkout', {workout});
  };

  return (
    <Container>
      <FlatList
        style={styles.workoutList}
        data={myWorkouts}
        renderItem={({item}) => (
          <Workout
            data={item}
            editAction={() => editWorkout(item)}
            delAction={() => dispatch(delWorkout(item))}
          />
        )}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  workoutList: {
    flex: 1,
    padding: 20,
  },
});
