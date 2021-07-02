import React, {useState} from 'react'
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

 } from './styles'
import SignInput from '../../components/SignInput'
import BarberLogo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import PersonIcon from '../../assets/person.svg'

export default ()=>{

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handlerSignClick = () => {


    }

    const handlerMessageButtonClick = () => {
        navigation.reset({
            routes:[{name:'SignUp'}]
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