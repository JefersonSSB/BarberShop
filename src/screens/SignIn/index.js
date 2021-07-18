import React, {useState, useContext} from 'react'
import SvgUri from 'react-native-svg-uri';
import { useNavigation } from '@react-navigation/native';
import { 
    Container,
    InputArea,
    CustomButtom,
    CustomButtomText,
    SignMessageButtom,
    SignMessageButtonText,
    SignMessageButtonTextBold
 } from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContexts';

export default ()=>{

    const { dispatch : userDispatch} = useContext(UserContext);
    const navigate = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handlerSignClick = async () => {
        if(emailField != '' && passwordField != ''){
            let res = await Api.signIn(emailField, passwordField);
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
                alert("Erro: "+res.error);
            }
        } else {
            alert("Preecha os campos!");
        }
    }

    const handlerMessageButtonClick = () => {
        navigate.reset({
            routes:[{name:'SignUp'}]
        }); 
    }

    return(
        <Container>
            <SvgUri height="160" source={BarberLogo} />
            <InputArea>
                <SignInput
                 IconSvg={EmailIcon}
                 placeholder="Digite seu e-mail"
                 value={emailField}
                 onChangeText={setEmailField}
                 />
                <SignInput 
                IconSvg={LockIcon}
                placeholder="Digite sua senha"
                value={passwordField}
                onChangeText={setPasswordField}
                password={true}
                />
                <CustomButtom onPress={handlerSignClick}>
                    <CustomButtomText>LOGIN</CustomButtomText>
                </CustomButtom>
            </InputArea>
            <SignMessageButtom onPress={handlerMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButtom>
        </Container>

    );
}