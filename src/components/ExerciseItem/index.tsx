import React from 'react';
import styled from 'styled-components/native';
import {IMuscle} from '../../interfaces/IWorkout';
import useMuscleImage from '../../hooks/useMuscleImage';

type ExerciseItemEditProps = {
  data: IMuscle;
  checkAction: () => void;
  index: number;
};

const ExerciseItemArea = styled.View`
  height: 50px;
  flex-direction: row;
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
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-left: 5px;
`;

const ExerciceName = styled.Text`
  font-size: 15px;
  color: #fff;
`;

const ExerciceDetails = styled.Text`
  font-size: 12px;
  color: #999;
`;

const ExerciseCheck = styled.TouchableHighlight`
  width: 60px;
  justify-content: center;
  align-items: center;
`;

const ExerciseDone = styled.Image`
  width: 40px;
  height: 40px;
`;

const ExerciseUnDone = styled.View`
  width: 40px;
  height: 40px;
  border: 5px solid #fff;
  border-radius: 20px;
`;

const ExerciseCount = styled.View`
  width: 25px;
  justify-content: center;
`;

const ExerciseCountText = styled.Text`
  font-size: 17px;
  color: #fff;
`;

export default ({data, checkAction, index}: ExerciseItemEditProps) => {
  return (
    <ExerciseItemArea>
      <>
        <ExerciseCount>
          <ExerciseCountText>{index + 1}.</ExerciseCountText>
        </ExerciseCount>
        <ExerciseMuscleArea>
          <ExerciseMuscleImage source={useMuscleImage(data.muscle)} />
        </ExerciseMuscleArea>
        <ExerciseInfo>
          <ExerciceName>{data.name}</ExerciceName>
          <ExerciceDetails>{`${data.sets} séries - ${data.reps} rep ${
            data.load ? ` - ${data.load} kg` : ''
          }`}</ExerciceDetails>
        </ExerciseInfo>
        <ExerciseCheck onPress={checkAction} underlayColor="transparent">
          {data.done ? (
            <ExerciseDone source={require('../../assets/check-white.png')} />
          ) : (
            <ExerciseUnDone />
          )}
        </ExerciseCheck>
      </>
    </ExerciseItemArea>
  );
};
