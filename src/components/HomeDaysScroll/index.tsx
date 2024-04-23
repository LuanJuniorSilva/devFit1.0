/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Day from './partials/Day';

type HomeMonthScrollProps = {
  selectedMonth: number;
  selectedDay: number;
  setSelectedDay: Dispatch<SetStateAction<number>>;
  dailyProgress: string[];
  workoutDays: number[];
};

const DaysScroll = styled.ScrollView`
  width: 100%;
  height: 50px;
  background-color: #fff;
`;

const screenWidth = Math.round(Dimensions.get('window').width);
let dayW = Math.round(screenWidth / 9);
let offsetW = Math.round((screenWidth - dayW) / 2);

export default ({
  selectedMonth,
  selectedDay,
  setSelectedDay,
  dailyProgress,
  workoutDays,
}: HomeMonthScrollProps) => {
  const [selectedMyDay, setSelectedMyDay] = useState(selectedDay);
  const dayRef = useRef<ScrollView>(null);

  const daysScrollEndAction = e => {
    let posX = e.nativeEvent.contentOffset.x;
    let targetDay = Math.round(posX / dayW) + 1;
    setSelectedMyDay(targetDay);
  };

  const scrollToDay = (d: number, press: boolean = false) => {
    let posX = (d - 1) * dayW;
    dayRef.current?.scrollTo({x: posX, y: 0, animated: true});

    if (press) {
      setSelectedMyDay(d);
    }
  };

  useEffect(() => {
    setSelectedDay(selectedMyDay);
  }, [selectedMyDay]);

  useEffect(() => {
    setTimeout(() => {
      if (selectedMonth === new Date().getMonth()) {
        scrollToDay(new Date().getDate());
      } else {
        scrollToDay(1);
      }
    }, 10);
  }, [selectedMonth]);

  let days = [];
  let daysInMonth = new Date(
    new Date().getFullYear(),
    selectedMonth + 1,
    0,
  ).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <DaysScroll
      ref={dayRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      snapToInterval={dayW}
      decelerationRate="fast"
      // snapToAlignment="center"
      contentContainerStyle={{paddingLeft: offsetW, paddingRight: offsetW}}
      onMomentumScrollEnd={daysScrollEndAction}>
      {days.map((d, k) => (
        <Day
          key={k}
          day={d}
          month={selectedMonth}
          dailyProgress={dailyProgress}
          workoutDays={workoutDays}
          onPress={() => scrollToDay(d, true)}
          dayW={dayW}
        />
      ))}
    </DaysScroll>
  );
};
