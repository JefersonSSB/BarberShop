import React, {useState, useEffect} from 'react';
import {
    Container,
    Scroller,
    UserInfoArea,
    FakeSwiper,
    PageBody,
    ServiceArea,
    TestimonialArea,
    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    UserInfo,
    UserAvatar,
    UserInfoName,
    UserFavButton,
    BackButton
} from './styles'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Stars from '../../components/Stars';

import SvgUri from 'react-native-svg-uri';
import Api from '../../Api';

import FavoriteIcon from '../../assets/favorite.svg'
import BackIcon from '../../assets/back.svg'


export default () =>{

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });

    const handleBackButton = async () =>{
        navigation.goBack();
    };

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getBarberInfo = async () =>{
            setLoading(true);
    
            let res = await Api.getBarber(userInfo.id);
    
            if(res.error == ''){

               setUserInfo(res.data);
                
            } else {
                alert("Erro:"+res.error);
            }
            setLoading(false);
        }

        getBarberInfo();

    }, []);

    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                <Swiper
                style={{height:240}}
                dot={<SwipeDot />}
                activeDot={<SwipeDotActive/>}
                paginationStyle={{top:15, right:15, bottom: null, left: null}}
                autoplay={true}
                >
                    {userInfo.photos.map((item, key ) => (
                        <SwipeItem key={key}>
                            <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                        </SwipeItem>  
                    ))}
                </Swiper>
                :
                <FakeSwiper></FakeSwiper>
                }
                <PageBody>
                <UserInfoArea>
                    <UserAvatar source={{uri:userInfo.avatar}}/>
                    <UserInfo>
                        <UserInfoName>{userInfo.name}</UserInfoName>
                        <Stars stars={userInfo.stars} showNumber={true}/>
                    </UserInfo>
                    <UserFavButton>
                        <SvgUri width="24" height="24" fill="#FF0000" source={FavoriteIcon}/>
                    </UserFavButton>
                </UserInfoArea>
                    <ServiceArea>
                    </ServiceArea>
                    <TestimonialArea>

                    </TestimonialArea>
                </PageBody>

            </Scroller>
            <BackButton onPress={handleBackButton}>
                <SvgUri width="44" height="44" fill="#FFF" source={BackIcon}/>
            </BackButton>
        </Container>
    );
}