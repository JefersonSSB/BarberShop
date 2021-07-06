import React, {useEffect, useContext} from 'react';
import {Container, LoadingIcon} from './styles';
import SvgUri from 'react-native-svg-uri';
import BarberLogo from '../../assets/barber.svg'
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import Api from '../../Api';
import { UserContext } from '../../contexts/UserContexts';

export default () => {

  const { dispatch : userDispatch} = useContext(UserContext);
  const navigate = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        let res = await Api.checkToken(token);
        if(res.token){
          await AsyncStorage.setItem('token', res.token);

          userDispatch({
              type: 'setAvatar',
              payload:{
                  avatar: res.data.avatar
              }
          });

          navigate.reset({
              routes:[{name:'MainTab'}]
          });
        }
        else{
          navigate.navigate('SignIn');
        }
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
