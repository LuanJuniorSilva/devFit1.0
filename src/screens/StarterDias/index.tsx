/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';

import {NavigationProps} from '../../interfaces/INavigate';
import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {setWorkoutDays} from '../../redux/reducers/userReducer';
import DefaultButton from '../../components/DefaultButton';

const Container = styled.SafeAreaView`
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

const BoldText = styled.Text`
  font-weight: bold;
`;

const DaysArea = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const DaysAreaText = styled.Text`
  color: #000;
`;

export default () => {
  const {name, workoutDays}: {name: string; workoutDays: number[]} =
    useAppSelector(state => state.userReducer);
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();

  const nextAction = () => {
    if (!workoutDays.length) {
      Alert.alert('Você precisa treinar pelo menos 1 dia');
      return;
    }

    navigation.navigate('StarterNivel');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <NextButton title="Próximo" onPress={nextAction} />,
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, [workoutDays]);

  const toggleDay = (d: number) => {
    let newWorkoutDays = [...workoutDays];
    if (!workoutDays.includes(d)) {
      newWorkoutDays.push(d);
    } else {
      newWorkoutDays = newWorkoutDays.filter(i => i !== d);
    }

    dispatch(setWorkoutDays(newWorkoutDays));
  };

  let [firstName] = name.split(' ');

  return (
    <Container>
      <HeaderText>
        Opa, <BoldText>{firstName}</BoldText>, tudo bem?
      </HeaderText>
      <HeaderText>
        Quais <BoldText>dias da semana</BoldText> você pretende treinar?
      </HeaderText>
      <DaysArea>
        <DefaultButton
          onPress={() => toggleDay(1)}
          width="100"
          bgcolor={workoutDays.includes(1) ? '#A5E8BC' : undefined}
          underlayColor="#CCC"
          style={{marginBottom: 20}}>
          <DaysAreaText>Segunda</DaysAreaText>
        </DefaultButton>
        <DefaultButton
          onPress={() => toggleDay(2)}
          width="90"
          underlayColor="#CCC"
          bgcolor={workoutDays.includes(2) ? '#A5E8BC' : undefined}
          style={{marginBottom: 20}}>
          <DaysAreaText>Terça</DaysAreaText>
        </DefaultButton>
        <DefaultButton
          onPress={() => toggleDay(3)}
          width="100"
          underlayColor="#CCC"
          bgcolor={workoutDays.includes(3) ? '#A5E8BC' : undefined}
          style={{marginBottom: 20}}>
          <DaysAreaText>Quarta</DaysAreaText>
        </DefaultButton>
        <DefaultButton
          onPress={() => toggleDay(4)}
          width="100"
          underlayColor="#CCC"
          bgcolor={workoutDays.includes(4) ? '#A5E8BC' : undefined}
          style={{marginBottom: 20}}>
          <DaysAreaText>Quinta</DaysAreaText>
        </DefaultButton>
        <DefaultButton
          onPress={() => toggleDay(5)}
          width="90"
          underlayColor="#CCC"
          bgcolor={workoutDays.includes(5) ? '#A5E8BC' : undefined}
          style={{marginBottom: 20}}>
          <DaysAreaText>Sexta</DaysAreaText>
        </DefaultButton>
        <DefaultButton
          onPress={() => toggleDay(6)}
          width="100"
          underlayColor="#CCC"
          bgcolor={workoutDays.includes(6) ? '#A5E8BC' : undefined}
          style={{marginBottom: 20}}>
          <DaysAreaText>Sábado</DaysAreaText>
        </DefaultButton>
        <DefaultButton
          onPress={() => toggleDay(0)}
          width="100"
          underlayColor="#CCC"
          bgcolor={workoutDays.includes(0) ? '#A5E8BC' : undefined}
          style={{marginBottom: 20}}>
          <DaysAreaText>Domingo</DaysAreaText>
        </DefaultButton>
      </DaysArea>
    </Container>
  );
};
