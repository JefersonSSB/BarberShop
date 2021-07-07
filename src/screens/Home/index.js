import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SvgUri from 'react-native-svg-uri';

import { request, PERMISSIONS } from 'react-native-permissions';
import GetLocation from 'react-native-get-location';

import Api from '../../Api.js';

import BarberItem from '../../components/BarberItem';

import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea
} from './styles'; 

import SeachIcon from '../../assets/search.svg'
import MyLocationIcon from '../../assets/my_location.svg'


export default () =>{

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');

    const [coords, setCoods] = useState('');
    const [loading, setLoading] = useState('');
    const [list, setList] = useState([]);

    const [refreshing, setRefreshing] = useState(false); 

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


    }

    const getBarbers = async () => {

        setLoading(true);
        setList([]);


        let lat = null;
        let lng = null;

        if(coords){
            lat = coords.latitude;
            lng = coords.longitude;
        }

        let res = await Api.getBarbers(lat,lng, locationText);

        if(res.error == ''){
            if(res.loc){
                setLocationText(res.loc);
            }

            setList(res.data);

        }else{

            alert('Erro: ' +res.error);
        }
        setLoading(false);
    }

    useEffect(() =>{
        getBarbers();
    },[]);

    const onRefresh = () =>{
        setRefreshing(false);
        getBarbers();
    }

    const handleLocationSearch =() =>{

        setCoods({});
        getBarbers();
    }


    return (
        <Container>
            <Scroller refreshControl = {
                <RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>
            }>
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
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <SvgUri width="26" height="26" fill="#FFF" source={MyLocationIcon}/>
                    </LocationFinder>
                </LocationArea>
                {loading ?
                    <LoadingIcon size="large" color="#FFF"/>
                    : null
                }

                <ListArea>
                    {list.map((item,k)=>(
                        <BarberItem key={k} data={item}/>
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    );
}
