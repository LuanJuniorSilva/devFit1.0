import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import DefaultButton from '../../components/DefaultButton';
import {NavigationProps} from '../../interfaces/INavigate';
import {StatusBar} from 'react-native';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-left: 30px;
  margin-right: 30px;
`;
const WelcomeText = styled.Text`
  font-size: 22px;
  color: #333;
  margin-top: 50px;
`;
const WelcomeImage = styled.View`
  flex: 1;
  justify-content: center;
`;
const WelcomeLogo = styled.Image`
  width: 200px;
  height: 200px;
`;
const BeginConfigArea = styled.View`
  margin-bottom: 50px;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: #fff;
`;

export default () => {
  const navigation = useNavigation<NavigationProps>();
  const start = () => {
    navigation.navigate('StarterName');
  };
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <WelcomeText>Bem vindo(a) ao DevFit</WelcomeText>
      <WelcomeImage>
        <WelcomeLogo source={require('../../assets/boneco.png')} />
      </WelcomeImage>
      <BeginConfigArea>
        <DefaultButton
          underlayColor="0b7ac6"
          width="100%"
          bgcolor="#0072c0"
          onPress={start}>
          <ButtonText>Iniciar Configuração</ButtonText>
        </DefaultButton>
      </BeginConfigArea>
    </Container>
  );
};
