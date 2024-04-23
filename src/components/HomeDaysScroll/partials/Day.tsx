import React from 'react';
import styled from 'styled-components/native';

type DayProps = {
  day: number;
  month: number;
  dayW: number;
  dailyProgress: string[];
  workoutDays: string[] | any;
  onPress: () => void;
};

const DayButton = styled.TouchableHighlight<{width: number}>`
  width: ${props => props.width}px;
  justify-content: center;
  align-items: center;
`;

const DayItem = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #eee;
  justify-content: center;
  align-items: center;
`;

const DayText = styled.Text`
  color: #000;
`;

export default ({
  day,
  month,
  dailyProgress,
  workoutDays,
  onPress,
  dayW,
}: DayProps) => {
  let bgColor = '#f4f4f4';
  let opacity = 1;

  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  let thisDate = new Date(today.getFullYear(), month, day);

  if (workoutDays.includes(thisDate.getDay())) {
    if (thisDate.getTime() < today.getTime()) {
      let thisYear = thisDate.getFullYear();
      let thisMonth: any = thisDate.getMonth() + 1;
      let thisDay: any = thisDate.getDate();
      thisMonth = thisMonth < 10 ? '0' + thisMonth : thisMonth;
      thisDay = thisDay < 10 ? '0' + thisDay : thisDay;

      let dFormated = `${thisYear}-${thisMonth}-${thisDay}`;

      if (dailyProgress.includes(dFormated)) {
        bgColor = '#b5ffb8'; // Treinou
      } else {
        bgColor = '#ffb5b5'; // Não Treinou
      }
    }
  } else {
    opacity = 0.2;
  }

  if (thisDate.getTime() === today.getTime()) {
    bgColor = '#b5eeff';
    opacity = 1;
  }

  return (
    <DayButton width={dayW} onPress={onPress} underlayColor="transparent">
      <DayItem style={{opacity, backgroundColor: bgColor}}>
        <DayText>{day}</DayText>
      </DayItem>
    </DayButton>
  );
};
