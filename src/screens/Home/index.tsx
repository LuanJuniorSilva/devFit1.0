/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {NavigationProps} from '../../interfaces/INavigate';
import HomeMonthScroll from '../../components/HomeMonthScroll';
import HomeDaysScroll from '../../components/HomeDaysScroll';
import HomeStatusScroll from '../../components/HomeStatusScroll';
import {addProgress, deleteProgress} from '../../redux/reducers/userReducer';

const Container = styled.SafeAreaView`
  align-items: center;
  background-color: #fff;
`;

const ConfigButtonArea = styled.TouchableHighlight`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;
const ConfigButtonImage = styled.Image`
  width: 25px;
  height: 25px;
`;

const Legend = styled.View`
  width: 90%;
  align-items: flex-start;
  margin-top: 30px;
`;

const LegendText = styled.Text`
  color: #555;
`;

const LegendItem = styled.Text`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const LegendBox = styled.View`
  width: 15px;
  height: 15px;
  background-color: #ccc;
  margin-right: 5px;
`;

export default () => {
  const navigation = useNavigation<NavigationProps>();
  const {
    dailyProgress,
    workoutDays,
  }: {dailyProgress: string[]; workoutDays: number[]} = useAppSelector(
    state => state.userReducer,
  );
  let today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const ConfigButton = () => {
    const btnAction = () => {
      navigation.navigate('HomeConfig');
    };
    return (
      <ConfigButtonArea onPress={btnAction} underlayColor="transparent">
        <ConfigButtonImage source={require('../../assets/config.png')} />
      </ConfigButtonArea>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ConfigButton />,
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, []);

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <HomeMonthScroll
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <HomeDaysScroll
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        dailyProgress={dailyProgress}
        workoutDays={workoutDays}
      />
      <HomeStatusScroll
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        dailyProgress={dailyProgress}
        workoutDays={workoutDays}
        addProgress={addProgress}
        delProgress={deleteProgress}
        goToWorkout={() => navigation.navigate('WorkoutStack')}
      />

      <Legend>
        <LegendText>Legenda:</LegendText>
        <LegendItem>
          <LegendBox style={{backgroundColor: '#b5eeff'}}></LegendBox>
          <LegendText>Hoje</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBox style={{backgroundColor: '#b5ffb8'}}></LegendBox>
          <LegendText>Treino feito</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBox style={{backgroundColor: '#ffb5b5'}}></LegendBox>
          <LegendText>Treino perdido</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBox
            style={{backgroundColor: '#f4f4f4', opacity: 0.2}}></LegendBox>
          <LegendText>Dia de descanso</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendBox style={{backgroundColor: '#f4f4f4'}}></LegendBox>
          <LegendText>Dia futuro</LegendText>
        </LegendItem>
      </Legend>
    </Container>
  );
};
