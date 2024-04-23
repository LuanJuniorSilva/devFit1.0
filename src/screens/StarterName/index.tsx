/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {NavigationProps} from '../../interfaces/INavigate';
import {useAppSelector} from '../../redux/hooks/useAppSelector';
import {setName} from '../../redux/reducers/userReducer';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #fff;
  padding-left: 30px;
  padding-right: 30px;
`;

export const HeaderText = styled.Text`
  font-size: 22px;
  color: #333;
  margin-top: 50px;
`;

export const NameInput = styled.TextInput`
  border: 1px solid #ccc;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
  color: #000;
`;

const NextButton = styled.Button``;

export default () => {
  const {name} = useAppSelector(state => state.userReducer);
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();

  const nextAction = () => {
    if (!name) {
      Alert.alert('Você precisa de um nome');
      return;
    }

    navigation.navigate('StarterDias');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <NextButton title="Próximo" onPress={nextAction} />,
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, [name]);

  return (
    <Container>
      <HeaderText>Qual é o seu nome?</HeaderText>
      <NameInput
        value={name}
        onChangeText={e => dispatch(setName(e))}
        autoFocus={true}
        autoCapitalize="words"
        onSubmitEditing={nextAction}
      />
    </Container>
  );
};
