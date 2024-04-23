/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {NavigationProps} from '../../interfaces/INavigate';
import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {setLevel} from '../../redux/reducers/userReducer';
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

const LevelArea = styled.View`
  width: 100%;
`;

const DaysAreaText = styled.Text`
  color: #000;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

export default () => {
  const {level, workoutDays}: {level: string; workoutDays: number[]} =
    useAppSelector(state => state.userReducer);
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();

  let funnyPrase = '';

  switch (workoutDays.length) {
    case 1:
      funnyPrase = 'Só 1 dia não vai adiantar muito, mas...';
      break;
    case 2:
      funnyPrase = '2 dias eu acho pouco, mas quem sou eu para te julgar?';
      break;
    case 3:
      funnyPrase = 'Legal, 3 dias dá pro gasto...';
      break;
    case 4:
      funnyPrase = 'Legal, 4 dias vai ser TOP!';
      break;
    case 5:
      funnyPrase = 'É isso aí, 5 dias é o mínimo, lets GO!';
      break;
    case 6:
      funnyPrase = 'É, 6 dias não é pra todo mundo...';
      break;
    case 7:
      funnyPrase = 'Woooow! Todo dia?! WTF?!';
      break;
  }

  const nextAction = () => {
    if (!level) {
      Alert.alert('Você precisa escolher uma opção.');
      return;
    }

    navigation.navigate('StarterRecommendations');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <NextButton title="Próximo" onPress={nextAction} />,
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, [level]);

  const setMyLevel = (myLevel: string) => {
    dispatch(setLevel(myLevel));
  };

  return (
    <Container>
      <HeaderText>
        <BoldText>{funnyPrase}</BoldText>
      </HeaderText>
      <HeaderText>Qual seu nível hoje?</HeaderText>
      <LevelArea>
        <DefaultButton
          onPress={() => setMyLevel('beginner')}
          bgcolor={level === 'beginner' ? '#A5E8BC' : undefined}
          underlayColor="#CCC"
          style={{marginBottom: 20}}>
          <DaysAreaText>Iniciante / Um frango</DaysAreaText>
        </DefaultButton>
        <DefaultButton
          onPress={() => setMyLevel('intermediate')}
          underlayColor="#CCC"
          bgcolor={level === 'intermediate' ? '#A5E8BC' : undefined}
          style={{marginBottom: 20}}>
          <DaysAreaText>Intermediário / Me viro bem</DaysAreaText>
        </DefaultButton>
        <DefaultButton
          onPress={() => setMyLevel('advanced')}
          underlayColor="#CCC"
          bgcolor={level === 'advanced' ? '#A5E8BC' : undefined}
          style={{marginBottom: 20}}>
          <DaysAreaText>Avançado / Primo do The Rock</DaysAreaText>
        </DefaultButton>
      </LevelArea>
    </Container>
  );
};
