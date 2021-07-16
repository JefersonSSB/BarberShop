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

    BackButton,
    LoadingIcon,
    ServicesTitle,
    ServiceInfo,
    ServiceItem,
    ServiceName,
    ServicePrice,
    ServiceChosseButton,
    ServiceChosseBtnText,
    TestimonialItem,
    TestimonialInfo,
    TestimonialName,
    TestimonialBody

} from './styles'; 

import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';
import BackIcon from '../../assets/back.svg'
import SvgUri from 'react-native-svg-uri';
import Api from '../../Api';

import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import NavPrevtIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';



export default () =>{

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });

    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService,setSelectedService ]  = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        const getBarberInfo = async () =>{
            setLoading(true);
    
            let res = await Api.getBarber(userInfo.id);
    
            if(res.error == ''){

               setUserInfo(res.data);
               setFavorited(res.data.favorited)
                
            } else {
                alert("Erro:"+res.error);
            }
            setLoading(false);
        }

        getBarberInfo();

    }, []);

    const handleBackButton = async () =>{
        navigation.goBack();
    };

    const handleFavClick = async () =>{
        setFavorited(!favorited);
    };

    const handleServiceChoose = (key) =>{
      setSelectedService(key);
      setShowModal(true);
    };

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
                        <UserFavButton onPress={handleFavClick}>
                            {favorited ?
                                <SvgUri width="24" height="24" fill="#FF0000" source={FavoriteFullIcon}/> 
                                : 
                                <SvgUri width="24" height="24" fill="#FF0000" source={FavoriteIcon}/>
                            }
            
                        </UserFavButton>
                    </UserInfoArea>
                    {loading ?
                        <LoadingIcon size="large" color="#000"/>
                        : null
                    }
                     {userInfo.services && userInfo.services.length > 0 ?
                    <ServiceArea>
                        <ServicesTitle>Lista de Serviços</ServicesTitle>
                        {userInfo.services.map((item, key) =>(
                            <ServiceItem key={key}>
                                <ServiceInfo>
                                    <ServiceName>{item.name}</ServiceName>
                                    <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                                </ServiceInfo>
                                <ServiceChosseButton onPress={ () => handleServiceChoose(key)}>
                                    <ServiceChosseBtnText>Agendar</ServiceChosseBtnText>
                                </ServiceChosseButton>
                                
                            </ServiceItem>
                        ))}
                    </ServiceArea>
                     : null }

                     {userInfo.testimonials && userInfo.testimonials.length > 0 ?
                    <TestimonialArea>
                        <Swiper
                                style={{height:110}}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<SvgUri width="35" height="35" fill="#000" source={NavPrevtIcon}/>}
                                nextButton={<SvgUri width="35" height="35" fill="#000" source={NavNextIcon}/>}
                        >
                            {userInfo.testimonials.map((item,key)=>(
                                <TestimonialItem key={key}>
                                    <TestimonialInfo>
                                        <TestimonialName>{item.name}</TestimonialName>
                                        <Stars stars={item.rate} showNumber={false}/>
                                    </TestimonialInfo> 
                                    <TestimonialBody>{item.body}</TestimonialBody>
                                </TestimonialItem>
                            ))}
                        </Swiper>
                    </TestimonialArea>
                    : null }
                </PageBody>
            </Scroller>
            <BackButton onPress={handleBackButton}>
                <SvgUri width="44" height="44" fill="#FFF" source={BackIcon}/>
            </BackButton>

            <BarberModal
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedService}
            >

            </BarberModal>


        </Container>
    );
}