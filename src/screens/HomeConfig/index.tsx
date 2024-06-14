/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';

import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {
  setName,
  setWorkoutDays,
  setLevel,
  reset,
} from '../../redux/reducers/userReducer';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../interfaces/INavigate';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  margin: 0 30px;
`;

const Label = styled.Text`
  color: #000;
  font-size: 15px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
  color: #000;
`;

const ListArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DayItem = styled.TouchableHighlight`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #eee;
  justify-content: center;
  align-items: center;
`;

const DayItemText = styled.Text`
  color: #000;
`;

const LevelItem = styled.TouchableHighlight`
  padding: 0 15px;
  background-color: #eee;
  height: 30px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const LevelItemText = styled.Text`
  color: #000;
`;

const ResetButton = styled.Button``;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const {
    name,
    workoutDays,
    level,
  }: {name: string; workoutDays: number[]; level: string} = useAppSelector(
    state => state.userReducer,
  );

  const toggleWorkoutDay = (d: number) => {
    let newWorkoutDays = [...workoutDays];
    if (newWorkoutDays.includes(d)) {
      if (newWorkoutDays.length === 1) {
        Alert.alert('Calma ae! Você tem que treinar pelo menos 1 dia');
        return;
      }
      newWorkoutDays = newWorkoutDays.filter(i => i !== d);
    } else {
      newWorkoutDays.push(d);
    }

    dispatch(setWorkoutDays(newWorkoutDays));
  };

  const resetAction = () => {
    dispatch(reset());
    navigation.reset({index: 0, routes: [{name: 'StarterStack'}]});
  };

  return (
    <Container>
      <Label>Seu nome completo:</Label>
      <Input value={name} onChangeText={e => dispatch(setName(e))} />
      <Label>Dias que você treina:</Label>
      <ListArea>
        <DayItem
          onPress={() => toggleWorkoutDay(1)}
          underlayColor="transparent"
          style={workoutDays.includes(1) ? {backgroundColor: '#a5e8bc'} : {}}>
          <DayItemText>S</DayItemText>
        </DayItem>
        <DayItem
          onPress={() => toggleWorkoutDay(2)}
          underlayColor="transparent"
          style={workoutDays.includes(2) ? {backgroundColor: '#a5e8bc'} : {}}>
          <DayItemText>T</DayItemText>
        </DayItem>
        <DayItem
          onPress={() => toggleWorkoutDay(3)}
          underlayColor="transparent"
          style={workoutDays.includes(3) ? {backgroundColor: '#a5e8bc'} : {}}>
          <DayItemText>Q</DayItemText>
        </DayItem>
        <DayItem
          onPress={() => toggleWorkoutDay(4)}
          underlayColor="transparent"
          style={workoutDays.includes(4) ? {backgroundColor: '#a5e8bc'} : {}}>
          <DayItemText>Q</DayItemText>
        </DayItem>
        <DayItem
          onPress={() => toggleWorkoutDay(5)}
          underlayColor="transparent"
          style={workoutDays.includes(5) ? {backgroundColor: '#a5e8bc'} : {}}>
          <DayItemText>S</DayItemText>
        </DayItem>
        <DayItem
          onPress={() => toggleWorkoutDay(6)}
          underlayColor="transparent"
          style={workoutDays.includes(6) ? {backgroundColor: '#a5e8bc'} : {}}>
          <DayItemText>S</DayItemText>
        </DayItem>
        <DayItem
          onPress={() => toggleWorkoutDay(0)}
          underlayColor="transparent"
          style={workoutDays.includes(0) ? {backgroundColor: '#a5e8bc'} : {}}>
          <DayItemText>D</DayItemText>
        </DayItem>
      </ListArea>
      <Label>Seu nível:</Label>
      <ListArea>
        <LevelItem
          onPress={() => dispatch(setLevel('beginner'))}
          underlayColor="transparent"
          style={level === 'beginner' ? {backgroundColor: '#a5e8bc'} : {}}>
          <LevelItemText>Iniciante</LevelItemText>
        </LevelItem>
        <LevelItem
          onPress={() => dispatch(setLevel('intermediate'))}
          underlayColor="transparent"
          style={level === 'intermediate' ? {backgroundColor: '#a5e8bc'} : {}}>
          <LevelItemText>Itermediário</LevelItemText>
        </LevelItem>
        <LevelItem
          onPress={() => dispatch(setLevel('advanced'))}
          underlayColor="transparent"
          style={level === 'advanced' ? {backgroundColor: '#a5e8bc'} : {}}>
          <LevelItemText>Avancado</LevelItemText>
        </LevelItem>
      </ListArea>

      <Label>Você quer resetar tudo?</Label>
      <ResetButton title="Resetar tudo" onPress={resetAction} />
    </Container>
  );
};
