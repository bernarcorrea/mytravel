import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { theme, padding } from '../styles/globalStyles';

import AsyncStorage from '@react-native-community/async-storage';
import Api from '../services/Api';

import Trigger from '../components/TriggerError';

import Icon from 'react-native-vector-icons/AntDesign';

const Modal = styled.Modal``;

const ModalMask = styled.View`
    flex: 1;
    background-color: ${theme.mask};
    justify-content: center;
    padding: 20px;
`;

const ModalBody = styled.View`
    padding: ${padding.paddingDefault};
    background-color: ${theme.silver};
    border-radius: 20px;
    position: relative;
`;

const ModalClose = styled.TouchableOpacity`
    position: absolute;
    width: 40px;
    height: 40px;
    top: -55px;
    right: 0;
    background-color: ${theme.primary};
    justify-content: center;
    align-items: center;
    border-radius: 20px;
`;

const ModalArea = styled.View``;

const ModalAreaTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${theme.dark};
    margin-bottom: 20px;
`;

const ModalCalendar = styled.View`
    background-color: ${theme.light};
    border-radius: 10px;
    padding: ${padding.paddingLow};
`;

const ModalCalendarHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const ButtonArrowMonth = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.silver};
`;

const CalendarSelectedMonth = styled.Text`
    font-size: 15px;
    color: ${theme.dark};
`;

const ModalCalendarDays = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
`;

const DayItem = styled.TouchableOpacity`
    width: 38px;
    height: 38px;
    margin: 2px;
    border-radius: 10px;
    background-color: ${theme.silver};
    justify-content: center;
    align-items: center;
`;

const DayItemText = styled.Text`
    font-size: 12px;
    color: ${theme.dark};
`;

const ModalHoursArea = styled.View`
    margin-top: 15px;
`;

const ModalHours = styled.View`
    background-color: ${theme.light};
    border-radius: 10px;
    padding: ${padding.paddingLow};
`

const ModalCalendarHours = styled.ScrollView``;

const HourItem = styled.TouchableOpacity`
    width: 85px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.silver};
    border-radius: 10px;
    margin-right: 10px;
`;

const HourText = styled.Text`
    font-size: 14px;
`;

const ButtonFinish = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: ${theme.primary};
    margin-top: 20px;
`;

const ButtonFinishText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${theme.light};
    margin-left: 5px;
`;

const LoadingIcon = styled.ActivityIndicator`
    margin-top: 20px;
`;

export default ({ show, setShow, service }) => {
    const [listDaysMonth, setListDaysMonth] = useState([]);
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedDayId, setSelectedDayId] = useState(0);
    const [listHours, setListHours] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const mounted = useRef(1);

    const navigation = useNavigation();

    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];

    const weekDays = [
        "Dom",
        "Seg",
        "Ter",
        "Qua",
        "Qui",
        "Sex",
        "Sáb"
    ];

    /** ARMAZENA MÊS, ANO E DIA ATUAL */
    useEffect(() => {
        let today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDay(today.getDate());

        mounted.current = 1;
        return () => { mounted.current = 0 };
    }, []);

    /** BUSCA A QUANTIDADE DE DIAS DO MÊS */
    useEffect(() => {
        if (service.dates) {
            let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            let newListDays = [];

            for (let i = 1; i <= daysInMonth; i++) {
                let date = new Date(selectedYear, selectedMonth, i);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();

                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                let newDate = year + '-' + month + '-' + day;

                let availability = service.dates.filter(e => e == newDate);

                newListDays.push({
                    weekday: weekDays[date.getDay()],
                    day: day,
                    number: i,
                    status: availability.length > 0 ? true : false,
                    date: newDate
                });
            }
            setListDaysMonth(newListDays);
            setSelectedDay(0);
        }
    }, [service, selectedMonth, selectedYear]);

    const handleSelectDay = async (date, number) => {
        setSelectedDay(number);
        setSelectedDayId(0);
        setListHours([]);

        let token = await AsyncStorage.getItem('token');
        if (token) {
            let json = await Api.get('/service/' + service.id + '/date/' + date + '&token=' + token);
            if (json.data.status) {
                setListHours(json.data.data);
                setSelectedDayId(json.data.id);
            } else {
                setError({
                    description: json.data.error,
                    type: "error"
                });
            }
        } else {
            setError({
                description: "Ocorreu um erro inesperado.",
                type: "error"
            });
        }
    }

    const handleCheckout = async () => {
        setLoading(true);
        let token = await AsyncStorage.getItem('token');
        if (token) {
            let json = await Api.post('/checkout', {
                token: token,
                service: service.id,
                date: selectedDayId,
                hour: selectedHour
            });
            if (json.data.status) {
                setSelectedDay(0);
                setSelectedDayId(0);
                setListHours([]);
                setShow(false);
                navigation.navigate('Appointments', { newList: true });
            } else {
                setError({
                    description: json.data.error,
                    type: "error"
                });
            }
        } else {
            setError({
                description: "Ocorreu um erro inesperado.",
                type: "error"
            });
        }
        setTimeout(() => {
            if (mounted.current) {
                setError(false);
            }
        }, 3000);
        setLoading(false);
    }

    const handlePrevMonth = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() - 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleNextMonth = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() + 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleCloseModal = () => {
        setShow(false);
    }

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="fade"
        >
            {error && <Trigger type={error.type} description={error.description} />}
            <ModalMask>
                <ModalBody>
                    <ModalClose onPress={handleCloseModal}>
                        <Icon name="close" size={15} color={theme.light} />
                    </ModalClose>
                    <ModalArea>
                        <ModalAreaTitle>Qual dia você deseja?</ModalAreaTitle>
                        <ModalCalendar>
                            <ModalCalendarHeader>
                                <ButtonArrowMonth onPress={handlePrevMonth}>
                                    <Icon name="left" size={15} color="#000000" />
                                </ButtonArrowMonth>
                                <CalendarSelectedMonth>{months[selectedMonth]} - {selectedYear}</CalendarSelectedMonth>
                                <ButtonArrowMonth onPress={handleNextMonth}>
                                    <Icon name="right" size={15} color="#000000" />
                                </ButtonArrowMonth>
                            </ModalCalendarHeader>
                            {listDaysMonth && listDaysMonth.length > 0 &&
                                <ModalCalendarDays>
                                    {listDaysMonth.map((item, k) => (
                                        <DayItem
                                            key={k}
                                            onPress={() => item.status ? handleSelectDay(item.date, item.number) : null}
                                            style={{
                                                opacity: item.status ? 1 : 0.4,
                                                backgroundColor: item.number === selectedDay ? theme.primary : theme.silver
                                            }}
                                        >
                                            <DayItemText style={{ color: item.number === selectedDay ? theme.light : theme.dark }}>
                                                {item.day}
                                            </DayItemText>
                                        </DayItem>
                                    ))}
                                </ModalCalendarDays>
                            }
                        </ModalCalendar>

                        {listHours && listHours.length > 0 &&
                            <ModalHoursArea>
                                <ModalAreaTitle>Qual horário você deseja?</ModalAreaTitle>
                                <ModalHours>
                                    <ModalCalendarHours horizontal={true} showsHorizontalScrollIndicator={false}>
                                        {listHours.map((item, k) => (
                                            <HourItem
                                                key={k}
                                                onPress={() => setSelectedHour(item.id)}
                                                style={{ backgroundColor: item.id === selectedHour ? theme.primary : theme.silver }}
                                            >
                                                <HourText style={{ color: item.id === selectedHour ? theme.light : theme.dark }}>
                                                    {item.hour}
                                                </HourText>
                                            </HourItem>
                                        ))}
                                    </ModalCalendarHours>
                                </ModalHours>
                            </ModalHoursArea>
                        }

                        {loading && <LoadingIcon size="large" color="#000000" />}

                        {selectedHour != null &&
                            <ButtonFinish onPress={handleCheckout}>
                                <Icon name="checkcircleo" size={18} color={theme.light} />
                                <ButtonFinishText>FINALIZAR RESERVA</ButtonFinishText>
                            </ButtonFinish>
                        }
                    </ModalArea>
                </ModalBody>
            </ModalMask>
        </Modal>
    );
}