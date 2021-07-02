import React, {useEffect} from 'react';
import {Container, LoadingIcon} from './styles';
import SvgUri from 'react-native-svg-uri';
import BarberLogo from '../../assets/barber.svg'
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const navigate = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // validar o Token
      } else {
        navigate.navigate('SignIn');
      }
    };
    checkToken();
  }, []);
  return (
    <Container>
      <SvgUri height="160" source={BarberLogo} />
      <LoadingIcon size="large" color="#FFFFFF" />
    </Container>
  );
};
