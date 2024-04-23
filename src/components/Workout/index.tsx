import React, {useState} from 'react';
import styled from 'styled-components/native';
import useMuscleImage from '../../hooks/useMuscleImage';
import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {IWorkout} from '../../interfaces/IWorkout';

const Workout = styled.View`
  background-color: #f1f1f1;
  flex-direction: row;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
`;

const WorkoutInfo = styled.View`
  flex: 1;
`;

const WorkoutTitle = styled.Text`
  font-size: 17px;
  margin: 10px;
  color: #000;
`;

const MuscleScroll = styled.ScrollView`
  margin: 10px;
`;

const WorkoutActions = styled.View`
  justify-content: center;
`;

const WourkoutButton = styled.TouchableHighlight`
  width: 25px;
  height: 25px;
  margin: 20px;
  justify-content: center;
  align-items: center;
`;

const WourkoutButtonImage = styled.Image`
  width: 25px;
  height: 25px;
`;

const MuscleGroup = styled.View`
  width: 40px;
  height: 40px;
  background-color: #ffcc98;
  border-radius: 5px;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
`;

const MuscleImage = styled.Image`
  width: 30px;
  height: 30px;
`;

type WorkoutProps = {
  data: IWorkout;
  addAction?: () => void;
  editAction?: () => void;
  delAction?: () => void;
  goAction?: () => void;
};

export default ({
  data,
  addAction,
  editAction,
  delAction,
  goAction,
}: WorkoutProps) => {
  const {myWorkouts}: {myWorkouts: IWorkout[]} = useAppSelector(
    state => state.userReducer,
  );

  const is = myWorkouts.find(item => item.id === data.id);
  const [included, setIncluded] = useState(!!is);
  let muscleGroups: string[] = [];
  for (let i in data.exercises) {
    if (!muscleGroups.includes(data.exercises[i].muscle)) {
      muscleGroups.push(data.exercises[i].muscle);
    }
  }

  const addWorkout = () => {
    if (addAction) {
      addAction();
    }
    setIncluded(!included);
  };

  const editWorkout = () => {
    if (editAction) {
      editAction();
    }
  };
  const delWorkout = () => {
    if (delAction) {
      delAction();
    }
  };

  const goWorkout = () => {
    if (goAction) {
      goAction();
    }
  };

  return (
    <Workout>
      <WorkoutInfo>
        <WorkoutTitle>{data.name}</WorkoutTitle>
        <MuscleScroll horizontal={true}>
          {muscleGroups.map((m, index) => (
            <MuscleGroup key={index}>
              <MuscleImage source={useMuscleImage(m)} />
            </MuscleGroup>
          ))}
        </MuscleScroll>
      </WorkoutInfo>
      <WorkoutActions>
        {addAction && (
          <WourkoutButton
            onPress={() => addWorkout()}
            underlayColor="transparent">
            <WourkoutButtonImage
              source={
                included
                  ? require('../../assets/check-black.png')
                  : require('../../assets/add.png')
              }
            />
          </WourkoutButton>
        )}
        {editAction && (
          <WourkoutButton
            onPress={() => editWorkout()}
            underlayColor="transparent">
            <WourkoutButtonImage
              source={require('../../assets/edit-black.png')}
            />
          </WourkoutButton>
        )}
        {delAction && (
          <WourkoutButton
            onPress={() => delWorkout()}
            underlayColor="transparent">
            <WourkoutButtonImage
              source={require('../../assets/trash-black.png')}
            />
          </WourkoutButton>
        )}
        {goAction && (
          <WourkoutButton
            onPress={() => goWorkout()}
            underlayColor="transparent">
            <WourkoutButtonImage
              source={require('../../assets/play-black.png')}
            />
          </WourkoutButton>
        )}
      </WorkoutActions>
    </Workout>
  );
};
