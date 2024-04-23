/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import styled from 'styled-components/native';
import DefaultButton from '../DefaultButton';
import {useDispatch} from 'react-redux';
import {deleteProgress} from '../../redux/reducers/userReducer';

type HomeStatusScroll = {
  selectedMonth: number;
  selectedDay: number;
  setSelectedDay: Dispatch<SetStateAction<number>>;
  dailyProgress: string[];
  workoutDays: string[] | any;
  addProgress: ActionCreatorWithPayload<any, 'userReducer/addProgress'>;
  delProgress: ActionCreatorWithPayload<any, 'userReducer/deleteProgress'>;
  goToWorkout: () => void;
};

const BalloonTriangle = styled.View`
  width: 0;
  height: 0;
  border-left-color: transparent;
  border-left-width: 15px;
  border-bottom-width: 15px;
  border-bottom-color: #ededed;
  border-right-width: 15px;
  border-right-color: transparent;
`;

const BalloonArea = styled.View`
  width: 90%;
  padding: 20px;
  background-color: #ededed;
  border-radius: 10px;
`;

const BalloonBigText = styled.Text`
  font-size: 15px;
  align-self: center;
  color: #000;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const BalloonText = styled.Text`
  font-size: 13px;
  align-self: center;
  margin-top: 10px;
  color: #000;
`;

const Strong = styled.Text`
  font-weight: bold;
`;

export default ({
  selectedDay,
  selectedMonth,
  workoutDays,
  dailyProgress,
  goToWorkout,
  addProgress,
}: HomeStatusScroll) => {
  const [timeLeft, setTimeLeft] = useState('');
  const dispatch = useDispatch();

  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  let thisDate = new Date(today.getFullYear(), selectedMonth, selectedDay);

  let thisYear = thisDate.getFullYear();
  let thisMonth: any = thisDate.getMonth() + 1;
  let thisDay: any = thisDate.getDate();
  thisMonth = thisMonth < 10 ? '0' + thisMonth : thisMonth;
  thisDay = thisDay < 10 ? '0' + thisDay : thisDay;

  let dFormated = `${thisYear}-${thisMonth}-${thisDay}`;

  let dayOff = false;
  let isToday = false;
  let isFuture = false;
  let isDone = false;

  if (!workoutDays.includes(thisDate.getDay())) {
    dayOff = true;
  } else if (thisDate.getTime() > today.getTime()) {
    isFuture = true;
  } else {
    if (dailyProgress.includes(dFormated)) {
      isDone = true;
    } else {
      isDone = false;
    }
  }

  if (thisDate.getTime() === today.getTime()) {
    isToday = true;
  }

  const setDone = () => {
    dispatch(addProgress(dFormated));
  };

  const setUnDone = () => {
    dispatch(deleteProgress(dFormated));
  };

  useEffect(() => {
    const timerFunction = () => {
      let now = Date.now();
      let endToday: any = new Date();
      endToday.setHours(23);
      endToday.setMinutes(59);
      endToday.setSeconds(59);
      endToday = endToday.getTime();

      let diff = endToday - now;

      let h: any = Math.floor(diff / (1000 * 60 * 60));
      let m: any = Math.floor(diff / (1000 * 60) - h * 60); //Math.floor((diff / (1000 * 60)) - (h * 60));
      let s: any = Math.floor(diff / 1000 - m * 60 - h * 60 * 60); //Math.floor((diff / 1000) - (m * 60) - ((h * 60) * 60));

      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      s = s < 10 ? '0' + s : s;

      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    let timer = setInterval(timerFunction, 1000);
    timerFunction();

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <BalloonTriangle />
      <BalloonArea>
        {dayOff && <BalloonBigText>Dia de Descanso!</BalloonBigText>}
        {isFuture && <BalloonBigText>Data no Futuro</BalloonBigText>}
        {!dayOff && !isFuture && isDone && (
          <>
            <BalloonBigText>
              <Strong>Parabéns</Strong>, você treinou
            </BalloonBigText>
            <DefaultButton
              onPress={setUnDone}
              bgcolor="#4ac34e"
              underlayColor="#4ac34e"
              style={{marginTop: 20}}>
              <ButtonText>DESMARCAR</ButtonText>
            </DefaultButton>
          </>
        )}
        {!dayOff && !isFuture && !isDone && !isToday && (
          <>
            <BalloonBigText>
              <Strong>Fraco!</Strong> Você falhou neste dia.
            </BalloonBigText>
            <DefaultButton
              onPress={setDone}
              bgcolor="#4ac34e"
              underlayColor="#4ac34e"
              style={{marginTop: 20}}>
              <ButtonText>MARCAR COMO FEITO</ButtonText>
            </DefaultButton>
          </>
        )}
        {!dayOff && !isFuture && !isDone && isToday && (
          <>
            <BalloonBigText>
              <Strong>HOJE TEM TREINO 🚀</Strong>
            </BalloonBigText>
            <BalloonText>Você tem {timeLeft} para treinar</BalloonText>
            <DefaultButton
              bgcolor="#4ac34e"
              underlayColor="#4ac34e"
              style={{marginTop: 20}}
              onPress={goToWorkout}>
              <ButtonText>INICIAR TREINO</ButtonText>
            </DefaultButton>
          </>
        )}
      </BalloonArea>
    </>
  );
};
