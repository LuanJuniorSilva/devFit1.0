import React from 'react';
import styled from 'styled-components/native';
import {SwipeRow} from 'react-native-swipe-list-view';
import {IMuscle} from '../../interfaces/IWorkout';
import useMuscleImage from '../../hooks/useMuscleImage';

type ExerciseItemEditProps = {
  data: IMuscle;
};

const ExerciseItemArea = styled.TouchableHighlight`
  height: 50px;
  flex-direction: row;
  background-color: #fff;
  margin-bottom: 10px;
`;

const ExerciseMuscleArea = styled.View`
  width: 50px;
  height: 50px;
  background-color: #ffcc98;
  border-raius: 10px;
  justify-content: center;
  align-items: center;
`;

const ExerciseMuscleImage = styled.Image`
  width: 35px;
  height: 35px;
`;

const ExerciseInfo = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 5px;
`;

const ExerciceName = styled.Text`
  font-size: 15px;
  color: #000;
`;

const ExerciceDetails = styled.Text`
  font-size: 12px;
  color: #999;
`;

const ExerciseSwipe = styled.TouchableHighlight`
  height: 50px;
  background-color: #ff0000;
  justify-content: center;
`;
const ExerciseSwipeIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-left: 15px;
`;

export default ({data}: ExerciseItemEditProps) => {
  return (
    <SwipeRow leftOpenValue={50} disableLeftSwipe={true}>
      <ExerciseSwipe>
        <ExerciseSwipeIcon source={require('../../assets/trash-white.png')} />
      </ExerciseSwipe>
      <ExerciseItemArea>
        <>
          <ExerciseMuscleArea>
            <ExerciseMuscleImage source={useMuscleImage(data.muscle)} />
          </ExerciseMuscleArea>
          <ExerciseInfo>
            <ExerciceName>{data.name}</ExerciceName>
            <ExerciceDetails>{`${data.sets} séries - ${data.reps} rep ${
              data.load ? ` - ${data.load} kg` : ''
            }`}</ExerciceDetails>
          </ExerciseInfo>
        </>
      </ExerciseItemArea>
    </SwipeRow>
  );
};
