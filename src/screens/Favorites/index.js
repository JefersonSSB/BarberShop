import React, {useState, useEffect} from 'react';
import {Text} from  'react-native';
import {Container} from './styles'; 
import Api from '../../Api';


export default () =>{

    const [userInfo, setUserInfo] = useState('');

    const getBarberInfo = async () =>{
    
        let res = await Api.getBarber(5);

        if(res.error == ''){
            setUserInfo(res.data);
            console.log(userInfo);
        } else {
            alert("Erro:"+res.error);
        }
    }

    useEffect(() => {
        getBarberInfo();
    }, []);


    return (
        <Container>
            <Text>Favorites</Text>
        </Container>
    );
}