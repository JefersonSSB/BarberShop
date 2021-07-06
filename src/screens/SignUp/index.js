import React, {useState} from 'react';
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
import PersonIcon from '../../assets/person.svg';

import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContexts';

export default ()=>{

    const { dispatch : userDispatch} = useContext(UserContext);
    const navigate = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handlerSignClick = async () => {

        if(nameField != '' &&  emailField != '' && passwordField != ''){
            let res = await Api.signUp(nameField, emailField, passwordField);

            if(json.token){
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
        navigation.reset({
            routes:[{name:'SignIn'}]
        }); 
    }

    return(
        <Container>
            <SvgUri height="160" source={BarberLogo} />
            <InputArea>
                 <SignInput
                 IconSvg={PersonIcon}
                 placeholder="Digite seu nome"
                 value={nameField}
                 onChangeText={t=>setNameField(t)}
                 />
                <SignInput
                 IconSvg={EmailIcon}
                 placeholder="Digite seu e-mail"
                 value={emailField}
                 onChangeText={t=>setEmailField(t)}
                 />
                <SignInput 
                IconSvg={LockIcon}
                placeholder="Digite sua senha"
                value={passwordField}
                onChangeText={t=>setPasswordField(t)}
                password={true}
                />
                <CustomButtom onPress={handlerSignClick}>
                    <CustomButtomText>CADASTRAR</CustomButtomText>
                </CustomButtom>
            </InputArea>
            <SignMessageButtom onPress={handlerMessageButtonClick}>
                <SignMessageButtonText>Jà possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButtom>
        </Container>

    );
}