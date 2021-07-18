import React,{ useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import SvgUri from 'react-native-svg-uri';

import ExpandIcon from './../assets/expand.svg'
import NavPrevtIcon from './../assets/nav_prev.svg';
import NavNextIcon from './../assets/nav_next.svg';

const Modal = styled.Modal``;

const ModalArea = styled.View`
flex: 1;
background-color: rgba(0, 0, 0, 0.5);
justify-content: flex-end;
`;

const ModalBody = styled.View`
background-color: #83D6E3;
border-top-right-radius: 20px;
border-top-left-radius: 20px;
min-height: 300px;
padding: 10px 20px 40px 20px;
`;

const ModalItem = styled.View`
background-color:#FFF;
border-radius: 10px;
margin-bottom: 15px;
padding: 10px;
`;

const UserInfo = styled.View`
flex-direction: row;
align-items: center;
`;

const UserAvatar = styled.Image`
width: 56px;
height: 56px;
border-radius: 20px;
margin-right: 15px;
`;

const UserName = styled.Text`
color: #000;
font-size: 18px;
font-weight: bold;
`;

const ServiceInfo = styled.View`
flex-direction: row;
justify-content: space-between;
`;

const ServiceName = styled.Text`
font-size: 16px;
font-weight: bold;
`;

const ServicePrice = styled.Text`
font-size: 16px;
font-weight: bold;
`;

const CloseButton = styled.TouchableOpacity`
    width: 40px
    height:40px;
`;

const  FinishButton = styled.TouchableOpacity`
background-color:#268596;
height: 60px;
justify-content: center;
align-items: center;
border-radius: 10px;
`;

const FinishButtonText = styled.Text`
color: #FFF;
font-size: 17px;
font-weight: bold;
`;

const DateInfo = styled.View`
flex-direction: row;
`;

const DatePrevArea = styled.TouchableOpacity`
flex: 1;
justify-content: flex-end;
align-items: flex-end;
`;

const DateNextArea = styled.TouchableOpacity`
flex: 1;
align-items: flex-start;
`;

const DateTitleArea = styled.View`
width:140px;
justify-content: center;
align-items:center;
`;

const DateTitle = styled.Text`
font-size: 17px;
font-weight: bold;
color #000;
`;

const DateList = styled.ScrollView``;

const DateItem = styled.TouchableOpacity`
width: 45px;
justify-content: center;
align-items:center;
border-radius: 10px;
padding-top: 5px;
padding-bottom: 5px;
`;

const DateItemWeekDay = styled.Text`
font-size: 16px;
font-weight: bold;
`;

const DateItemNumber = styled.Text`
font-size: 16px;
font-weight: bold;
`;


const TimeList = styled.ScrollView``;

const TimeItem = styled.TouchableOpacity`
width: 75px;
height: 40px;
justify-content: center;
align-items:center;
border-radius: 10px;
padding-top: 5px;
padding-bottom: 5px;
`;

const TimeItemText = styled.Text`
font-size: 16px;
font-weight: bold;
`;

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];

export default ({show, setShow, user, service }) =>{

    const navigation = useNavigation();

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);

    useEffect(()=>{
        if(user.available){
        let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        let newListDays = [];
        for(let i =1; i <= daysInMonth ; i++){
            let d = new Date(selectedYear,selectedMonth, i);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();

            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;

            let selDate = year + '-' + month + '-' + day;
            let availability = user.available.filter(e=>e.date===selDate);

            newListDays.push({
                status: availability.length > 0 ? true : false,
                weekdays: days[d.getDay()],
                number: i
            })
        }
            setListDays(newListDays);
            setSelectedDay(0);
            setListHours([]);
            setSelectedHour(0);
    }

    }, [user, selectedMonth,selectedYear]);

    useEffect(()=>{

        if(user.available && selectedDay > 0){
            let d = new Date(selectedYear,selectedMonth, selectedDay);
        
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let day = d.getDate();

                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;

                let selDate = year + '-' + month + '-' + day;

                let availability = user.available.filter(e=>e.date===selDate);

                if(availability.length > 0){
                   setListHours(availability[0].hours);
                }
        }
        setSelectedHour(null);
    },[user, selectedDay])

    useEffect(()=>{
        let today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDay(today.getDate());
    },[])

    const handleLeftDateClick = () =>{
       let mountDate = new Date(selectedYear, selectedMonth, 1);
       mountDate.setMonth(mountDate.getMonth() - 1);
       setSelectedYear(mountDate.getFullYear());
       setSelectedMonth(mountDate.getMonth());
       setSelectedDay(0);
    }

    const handleRigthDateClick = () =>{

        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() + 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
       
    }

    const handleCloseButton = () =>{
        setShow(false);
    }

    const handleFinishClick = () =>{
        
    }

    return (
        <Modal
        transparent={true}
        visible={show}
        animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                        <SvgUri width="40" height="40" fill="#000" source={ExpandIcon}/>
                    </CloseButton>
                    <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{uri:user.avatar}}></UserAvatar>
                            <UserName>{user.name}</UserName>
                        </UserInfo>
                    </ModalItem>
                    {service != null?
                    <ModalItem>
                        <ServiceInfo>
                            <ServiceName>{user.services[service].name}</ServiceName>
                            <ServicePrice>R$ {user.services[service].price.toFixed(2)}</ServicePrice>
                        </ServiceInfo>
                    </ModalItem>
                    : null}
                    <ModalItem>
                        <DateInfo>
                            <DatePrevArea onPress={handleLeftDateClick}>
                                <SvgUri width="35" height="35" fill="#000" source={NavPrevtIcon}/>
                            </DatePrevArea>
                                <DateTitleArea>
                                    <DateTitle>
                                       {months[selectedMonth]} {selectedYear} 
                                    </DateTitle>
                                </DateTitleArea>
                            <DateNextArea onPress={handleRigthDateClick}>
                                <SvgUri width="35" height="35" fill="#000" source={NavNextIcon}/>
                            </DateNextArea>
                        </DateInfo>
                        <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
                            {listDays.map((item, key) =>(
                                <DateItem
                                 key={key}
                                  onPress={()=>item.status ? setSelectedDay(item.number): null}
                                  style={{
                                        opacity: item.status? 1 : 0.4,
                                        backgroundColor: item.number === selectedDay ? '#4EADBE' : '#FFFFFF'  
                                  }}
                                  >
                                    <DateItemWeekDay
                                    style={{
                                        color: item.number === selectedDay ? '#FFF' : '#000'
                                    }}
                                    >{item.weekdays}</DateItemWeekDay>
                                    <DateItemNumber
                                     style={{
                                        color: item.number  === selectedDay ? '#FFF' : '#000'
                                    }}
                                    >{item.number}</DateItemNumber>
                                </DateItem>
                            ))
                            }
                        </DateList>
                    </ModalItem>
                            { selectedDay > 0 & listHours.length > 0 ?
                             <ModalItem>
                                 <TimeList horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {listHours.map((item,key)=>(
                                        <TimeItem
                                            key={key}
                                            style={{
                                                backgroundColor: item === selectedHour  ? '#4EADBE' : '#FFFFFF'
                                            }}
                                            onPress={()=> setSelectedHour(item)}
                                        >
                                            <TimeItemText
                                            style={{
                                                color: item  === selectedHour ? '#FFF' : '#000'
                                            }}>{item}</TimeItemText>
                                        </TimeItem>
                                    ))
                                    }
                                 </TimeList>
                             </ModalItem>
                        : null}
                    <FinishButton onPress={handleFinishClick}>
                        <FinishButtonText>Finalizar Agendamento</FinishButtonText>
                    </FinishButton>
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}