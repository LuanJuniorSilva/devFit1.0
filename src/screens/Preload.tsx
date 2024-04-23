/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../redux/hooks/useAppSelector';
import {NavigationProps} from '../interfaces/INavigate';

const Preload = () => {
  const navigation = useNavigation<NavigationProps>();
  const {name} = useAppSelector(state => state.userReducer);

  useEffect(() => {
    StackActions.popToTop();
    if (!name) {
      navigation.navigate('StarterStack');
    } else {
      navigation.navigate('AppTab');
    }
  }, []);

  return null;
};

export default Preload;
