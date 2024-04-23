/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, {useLayoutEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';

import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {NavigationProps} from '../../interfaces/INavigate';
import {RouteProp} from '../../interfaces/IRoute';
import DefaultButton from '../../components/DefaultButton';
import {FlatList, StyleSheet, Text} from 'react-native';
import ExerciseItemEdit from '../../components/ExerciseItemEdit';
import {IMuscle} from '../../interfaces/IWorkout';

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

export default () => {
  const dispatch = useDispatch();
  // const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProp>();
  const navigation = useNavigation();

  const isEdit = route.params?.workout;
  const [id, setId] = useState(isEdit ? route.params?.workout.id : '');
  const [name, setName] = useState(isEdit ? route.params?.workout.name : '');
  const [exercises, setExercises] = useState<IMuscle[]>(
    isEdit ? route.params?.workout.exercises : [],
  );

  // console.log('navigation', navigation.);

  const SaveWorkoutButton = () => {
    return (
      <SaveArea underlayColor="transparent">
        <SaveImage source={require('../../assets/check-black.png')} />
      </SaveArea>
    );
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
  }, []);

  console.log('exercises', exercises);

  return (
    <Container>
      <NameInput
        value={name}
        onChangeText={e => setName(e)}
        placeholder="Digite o nome do treino"
        placeholderTextColor="#000"
      />
      <ExercicesArea>
        <DefaultButton bgcolor="#4ac34e">
          <ButtonText>Adicionar Exercício</ButtonText>
        </DefaultButton>
        <FlatList
          style={styles.exercisesList}
          data={exercises}
          renderItem={({item}) => <ExerciseItemEdit data={item} />}
          keyExtractor={item => item.name}
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
