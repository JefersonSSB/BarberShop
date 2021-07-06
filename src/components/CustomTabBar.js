import React, {useContext} from 'react'
import styled from 'styled-components/native'
import SvgUri from 'react-native-svg-uri';

import {UserContext} from '../contexts/UserContexts'

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';

const TabArea = styled.View`
height: 60px;
background-color:#4EADBE;
flex-direction: row;
`;

const  TabItem = styled.TouchableOpacity`
flex:1;
justify-content: center;
align-items: center;
`;

const  TabItemCenter = styled.TouchableOpacity`
width:70px;
height:70px;
justify-content:center;
align-items:center;
background-color:#FFF;
border-radius:35px;
border: 3px solid  #4EADBE;
margin-top: -20px;
`;

const AvatarIcon = styled.Image`
width:24px;
height:24px;
border-radius:12px;
`;


export default ({state,navigation}) =>{

    const { state:user } = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }
    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                <SvgUri style={{opacity: state.index === 0? 1 : 0.6}} width="24" height="24" fill="#FFF" source={HomeIcon} />
            </TabItem >
            <TabItem onPress={()=>goTo('Search')}>
                <SvgUri style={{opacity: state.index === 1? 1 : 0.6}} width="24" height="24" fill="#FFF" source={SearchIcon} />
            </TabItem>
            <TabItemCenter onPress={()=>goTo('Appointments')}>
                <SvgUri style={{opacity: state.index === 2? 1 : 0.7}} width="32" height="32" fill="#4EADBE" source={TodayIcon} />
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Favorites')}>
                <SvgUri style={{opacity: state.index === 3? 1 : 0.6}} width="24" height="24" fill="#FFF" source={FavoriteIcon} />
            </TabItem>
            <TabItem onPress={()=>goTo('Profile')}>
                {user.avatar != '' ?
                <AvatarIcon source={{uri: user.avatar}} />
                :
                <SvgUri style={{opacity: state.index === 4? 1 : 0.6}} width="24" height="24" fill="#FFF" source={AccountIcon} />
                }
                
            </TabItem>
        </TabArea>
    );

}