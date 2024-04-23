/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {NavigationProps} from '../../interfaces/INavigate';
import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {addWorkout, delWorkout} from '../../redux/reducers/userReducer';
import workoutJson from '../../presetWorkouts.json';
import Workout from '../../components/Workout';
import {IWorkout} from '../../interfaces/IWorkout';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fff;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 50px;
`;

const HeaderText = styled.Text`
  font-size: 15px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const NextButton = styled.Button``;

export default () => {
  const {myWorkouts} = useAppSelector(state => state.userReducer);
  const navigation = useNavigation<NavigationProps>();

  const dispatch = useDispatch();

  const nextAction = () => {
    navigation.reset({index: 0, routes: [{name: 'AppTab'}]});
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NextButton
          title={myWorkouts.length > 0 ? 'Concluir' : 'Ignorar'}
          onPress={nextAction}
        />
      ),
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, [myWorkouts]);

  const addMyWorkout = (item: IWorkout) => {
    if (myWorkouts.findIndex(i => i.id === item.id) < 0) {
      dispatch(addWorkout(item));
    } else {
      dispatch(delWorkout(item));
    }
  };

  return (
    <Container>
      <HeaderText>
        Opções de treino pré-criados com base no seu nível.
      </HeaderText>
      <HeaderText>Vocë selecionou {myWorkouts.length} treinos</HeaderText>
      <FlatList
        data={workoutJson}
        renderItem={({item}) => (
          <Workout data={item} addAction={() => addMyWorkout(item)} />
        )}
        keyExtractor={item => item.id}
        style={styles.workoutList}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  workoutList: {
    width: '100%',
  },
  item: {
    color: '#000',
  },
});
