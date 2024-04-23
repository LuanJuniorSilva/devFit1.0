import React from 'react';
import styled from 'styled-components/native';
import {IMuscle} from '../../interfaces/IWorkout';
import useMuscleImage from '../../hooks/useMuscleImage';

type ExerciseItemEditProps = {
  data: IMuscle;
  editAction: (item: any) => void;
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

export default ({data, editAction}: ExerciseItemEditProps) => {
  return (
    <>
      <ExerciseItemArea onPress={editAction} underlayColor="#fff">
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
    </>
  );
};
