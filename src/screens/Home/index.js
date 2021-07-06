import React, { useState } from 'react';
import { Platform, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SvgUri from 'react-native-svg-uri';

import { request, PERMISSIONS } from 'react-native-permissions';
import GetLocation from 'react-native-get-location'

import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon
} from './styles'; 

import SeachIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'


export default () =>{

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');

    const [coords, setCoods] = useState('');
    const [loading, setLoading] = useState('');
    const [list, setList] = useState('');

    const handleLocationFinder = async () => {
        setCoods(null);
        let result = await request(
        Platform.OS === 'ios' ?
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        :
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

     
        if(result == 'granted') {
            
            setLoading(true);
            setLocationText('');
            setList([]);

            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
            .then(location => {
                setCoods(location);
                getBarbers();
            })
            .catch(error => {
                const { code, message } = error;
            })
        }


    };

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito</HeaderTitle>
                        <SearchButton onPress={()=> navigation.navigate('Search')}>
                            <SvgUri width="26" height="26" fill="#FFF" source={SeachIcon} />
                        </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você esta?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <SvgUri width="26" height="26" fill="#FFF" source={MyLocationIcon}/>
                    </LocationFinder>
                </LocationArea>
                {loading ?
                    <LoadingIcon size="large" color="#FFF"/>
                    : null
                }
            </Scroller>
        </Container>
    );
}
