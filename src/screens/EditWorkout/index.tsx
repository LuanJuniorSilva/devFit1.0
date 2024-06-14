/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';

import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {NavigationProps} from '../../interfaces/INavigate';
import {addWorkout, updateWorkout} from '../../redux/reducers/userReducer';
import {RouteProp} from '../../interfaces/IRoute';
import DefaultButton from '../../components/DefaultButton';
import {Alert, StyleSheet} from 'react-native';
import ExerciseItemEdit from '../../components/ExerciseItemEdit';
import {IMuscle, IWorkout} from '../../interfaces/IWorkout';
import CustomModal from '../../components/CustomModal';
import {generateHash} from '../../utils/generateHash';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  margin: 20px;
`;

const SaveArea = styled.TouchableHighlight`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const SaveImage = styled.Image`
  width: 25px;
  height: 25px;
`;

const NameInput = styled.TextInput`
  border: 1px solid #ccc;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
  color: #000;
`;

export const ExercicesArea = styled.View`
  flex: 1;
  margin-top: 20px;
  padding-top: 20px;
  border-top-width: 1px;
  border-top-color: #ccc;
`;

export const ButtonText = styled.Text``;

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

const ModalLabel = styled.Text`
  color: #000;
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
`;

const ModalMuscles = styled.ScrollView``;

const ModalInput = styled.TextInput`
  width: 100%;
  font-size: 14px;
  color: #333;
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const ModalMuscle = styled.TouchableHighlight<{opacity: number}>`
  width: 50px;
  height: 50px;
  background-color: #eee;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  opacity: ${props => props.opacity};
`;

const ModalMuscleImage = styled.Image`
  width: 35px;
  height: 35px;
`;

const ModalExtra = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ModalExtraItem = styled.View`
  align-items: center;
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp>();
  // const navigation = useNavigation();

  const isEdit = route.params?.workout;
  const [id, setId] = useState(isEdit ? route.params?.workout.id : '');
  const [name, setName] = useState(isEdit ? route.params?.workout.name : '');
  const [exercises, setExercises] = useState<IMuscle[]>(
    isEdit ? route.params?.workout.exercises : [],
  );
  const [workoutItem, setWorkoutItem] = useState<IWorkout>(
    isEdit ? route.params?.workout : null,
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalId, setModalId] = useState('');
  const [modalName, setModalName] = useState('');
  const [modalMuscle, setModalMuscle] = useState('');
  const [modalSets, setModalSets] = useState('');
  const [modalReps, setModalReps] = useState('');
  const [modalLoad, setModalLoad] = useState('');

  const handleSave = () => {
    if (workoutItem) {
      let workout = workoutItem;
      if (workout.exercises.length > 0) {
        if (workout.id !== '') {
          dispatch(updateWorkout(workout));
        } else {
          workout.id = generateHash();
          dispatch(addWorkout(workout));
        }
        navigation.goBack();
      } else {
        Alert.alert('Você precisa pelo menos ter 1 exercício');
      }
    }
  };

  const SaveWorkoutButton = () => {
    return (
      <SaveArea underlayColor="transparent" onPress={handleSave}>
        <SaveImage source={require('../../assets/check-black.png')} />
      </SaveArea>
    );
  };

  useEffect(() => {
    let newWorkout = {...workoutItem};
    newWorkout.name = name;
    newWorkout.id = id ? id : '';
    newWorkout.exercises = exercises;
    setWorkoutItem(newWorkout);
  }, [name, exercises]);

  const modalSave = () => {
    let newExercises = [...exercises];

    if (
      modalName === '' ||
      modalMuscle === '' ||
      modalSets === '' ||
      modalReps === ''
    ) {
      Alert.alert('Preencha todas as informações');
      return;
    }
    if (modalId) {
      let index = newExercises.findIndex(i => i.id === modalId);
      if (index > -1) {
        newExercises[index].name = modalName;
        newExercises[index].muscle = modalMuscle;
        newExercises[index].sets = modalSets;
        newExercises[index].reps = modalReps;
        newExercises[index].load = modalLoad;
      }
    } else {
      let ex = {
        id: generateHash(),
        name: modalName,
        muscle: modalMuscle,
        sets: modalSets,
        reps: modalReps,
        load: modalLoad,
      };
      newExercises.push(ex);
    }
    setExercises(newExercises);
    setModalVisible(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdit ? 'Editar Treino' : 'Adicionar Treino',
      headerRight: () => <SaveWorkoutButton />,
      headerRightContainerStyle: {
        marginRight: 10,
      },
      headerTitleAlign: 'center',
    });
  }, [name, exercises, modalSave]);

  const editAction = (exercise: IMuscle) => {
    setModalId(exercise.id);
    setModalName(exercise.name);
    setModalMuscle(exercise.muscle);
    setModalSets(exercise.sets);
    setModalReps(exercise.reps);
    setModalLoad(exercise.load);
    setModalVisible(true);
  };

  const delAction = (exercise: IMuscle) => {
    let newExercises = [...exercises];
    newExercises = newExercises.filter(i => i.id !== exercise.id);
    setExercises(newExercises);
  };

  const resetModal = () => {
    setModalId('');
    setModalName('');
    setModalMuscle('');
    setModalSets('');
    setModalReps('');
    setModalLoad('');
  };

  const addExercise = () => {
    resetModal();
    setModalVisible(true);
  };

  return (
    <Container>
      <CustomModal
        visible={modalVisible}
        closeAction={() => setModalVisible(false)}>
        <ModalLabel>Músculo de foco</ModalLabel>
        <ModalMuscles horizontal={true} showsHorizontalScrollIndicator={false}>
          <ModalMuscle
            opacity={modalMuscle === 'abs' ? 1 : 0.3}
            underlayColor="transparent"
            onPress={() => setModalMuscle('abs')}>
            <ModalMuscleImage
              source={require('../../assets/muscles/abs.png')}
            />
          </ModalMuscle>
          <ModalMuscle
            opacity={modalMuscle === 'back' ? 1 : 0.3}
            underlayColor="transparent"
            onPress={() => setModalMuscle('back')}>
            <ModalMuscleImage
              source={require('../../assets/muscles/back.png')}
            />
          </ModalMuscle>
          <ModalMuscle
            opacity={modalMuscle === 'biceps' ? 1 : 0.3}
            underlayColor="transparent"
            onPress={() => setModalMuscle('biceps')}>
            <ModalMuscleImage
              source={require('../../assets/muscles/biceps.png')}
            />
          </ModalMuscle>
          <ModalMuscle
            opacity={modalMuscle === 'chest' ? 1 : 0.3}
            underlayColor="transparent"
            onPress={() => setModalMuscle('chest')}>
            <ModalMuscleImage
              source={require('../../assets/muscles/chest.png')}
            />
          </ModalMuscle>
          <ModalMuscle
            opacity={modalMuscle === 'gluteos' ? 1 : 0.3}
            underlayColor="transparent"
            onPress={() => setModalMuscle('gluteos')}>
            <ModalMuscleImage
              source={require('../../assets/muscles/gluteos.png')}
            />
          </ModalMuscle>
          <ModalMuscle
            opacity={modalMuscle === 'legs' ? 1 : 0.3}
            underlayColor="transparent"
            onPress={() => setModalMuscle('legs')}>
            <ModalMuscleImage
              source={require('../../assets/muscles/legs.png')}
            />
          </ModalMuscle>
          <ModalMuscle
            opacity={modalMuscle === 'shoulders' ? 1 : 0.3}
            underlayColor="transparent"
            onPress={() => setModalMuscle('shoulders')}>
            <ModalMuscleImage
              source={require('../../assets/muscles/shoulders.png')}
            />
          </ModalMuscle>
          <ModalMuscle
            opacity={modalMuscle === 'triceps' ? 1 : 0.3}
            underlayColor="transparent"
            onPress={() => setModalMuscle('triceps')}>
            <ModalMuscleImage
              source={require('../../assets/muscles/triceps.png')}
            />
          </ModalMuscle>
        </ModalMuscles>

        <ModalLabel>Nome do Exercício</ModalLabel>
        <ModalInput value={modalName} onChangeText={e => setModalName(e)} />
        <ModalExtra>
          <ModalExtraItem>
            <ModalLabel>Séries</ModalLabel>
            <ModalInput
              keyboardType="numeric"
              value={modalSets}
              onChangeText={e => setModalSets(e)}
            />
          </ModalExtraItem>
          <ModalExtraItem>
            <ModalLabel>Repetições</ModalLabel>
            <ModalInput
              keyboardType="numeric"
              value={modalReps}
              onChangeText={e => setModalReps(e)}
            />
          </ModalExtraItem>
          <ModalExtraItem>
            <ModalLabel>Carga</ModalLabel>
            <ModalInput
              keyboardType="numeric"
              value={modalLoad}
              onChangeText={e => setModalLoad(e)}
            />
          </ModalExtraItem>
        </ModalExtra>
        <DefaultButton
          bgcolor="#4ac34e"
          onPress={modalSave}
          underlayColor="transparent">
          <ButtonText>Salvar</ButtonText>
        </DefaultButton>
      </CustomModal>
      <NameInput
        value={name}
        onChangeText={e => setName(e)}
        placeholder="Digite o nome do treino"
        placeholderTextColor="#000"
      />
      <ExercicesArea>
        <DefaultButton
          bgcolor="#4ac34e"
          onPress={addExercise}
          underlayColor="transparent">
          <ButtonText>Adicionar Exercício</ButtonText>
        </DefaultButton>
        <SwipeListView
          useFlatList
          style={styles.exercisesList}
          data={exercises}
          leftOpenValue={50}
          disableLeftSwipe={true}
          renderItem={({item}) => (
            <ExerciseItemEdit data={item} editAction={() => editAction(item)} />
          )}
          renderHiddenItem={({item}) => (
            <ExerciseSwipe
              onPress={() => delAction(item)}
              underlayColor="#ff0000">
              <ExerciseSwipeIcon
                source={require('../../assets/trash-white.png')}
              />
            </ExerciseSwipe>
          )}
        />
      </ExercicesArea>
    </Container>
  );
};

const styles = StyleSheet.create({
  exercisesList: {
    flex: 1,
    paddingTop: 20,
  },
});
