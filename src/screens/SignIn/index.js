import React, {useState} from 'react'
import SvgUri from 'react-native-svg-uri';
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

export default ()=>{

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    return(
        <Container>
            <SvgUri height="160" source={BarberLogo} />
            <InputArea>
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
                <CustomButtom>
                    <CustomButtomText>LOGIN</CustomButtomText>
                </CustomButtom>
            </InputArea>
            <SignMessageButtom>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButtom>
        </Container>

    );
}