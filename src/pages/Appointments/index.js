import React, { useEffect, useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import Api from '../../services/Api';

import { theme } from '../../styles/globalStyles';

import StatusBar from '../../components/StatusBar';
import Trigger from '../../components/TriggerError';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  Container,
  Scroller,
  PageBody,
  PageSubtitleText,
  AppointmentsArea,
  AppointmentItem,
  ServicePhoto,
  AppointmentDetails,
  AppointmentDesc,
  ServiceTitleText,
  ServiceDetails,
  ServiceDetailsItem,
  ServiceDetailsText,
  LoadingIcon,
} from './styles';

export default () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [listAppointments, setListAppointments] = useState([]);

  const getAppointments = async () => {
    setLoading(true);
    setListAppointments([]);
    let token = await AsyncStorage.getItem('token');
    if (token) {
      let json = await Api.get('/appointments&token=' + token);
      if (json.data.status) {
        setListAppointments(json.data.data);
      } else {
        setError({
          description: json.data.error,
          type: "error"
        })
      }
    } else {
      setError({
        description: "Ocorreu um erro desconhecido.",
        type: "error"
      })
    }
    setLoading(false);
  }

  const onRefresh = () => {
    setRefreshing(false);
    getAppointments();
  }

  useFocusEffect(
    useCallback(() => {
      getAppointments();
    }, [])
  );

  return (
    <Container>
      {error && <Trigger type={error.type} description={error.description} />}
      <StatusBar backgroundColor={theme.silver} barStyle="dark-content" />
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Header title="Reservas" />
        <PageBody>
          <PageSubtitleText>Veja abaixo as suas reservas ativas:</PageSubtitleText>
          {loading && <LoadingIcon size="large" color="#000000" />}

          {listAppointments && listAppointments.length > 0 &&
            <AppointmentsArea>
              {listAppointments.map((item, k) => (
                <AppointmentItem key={k}>
                  <ServicePhoto source={{ uri: item.cover }} resizeMode="cover" />
                  <AppointmentDetails>
                    <AppointmentDesc>
                      <ServiceTitleText>{item.service}</ServiceTitleText>
                      <ServiceDetails>
                        <ServiceDetailsItem backgroundColor={theme.primary}>
                          <ServiceDetailsText color={theme.light}>R$ {item.price}</ServiceDetailsText>
                        </ServiceDetailsItem>
                        <ServiceDetailsItem backgroundColor={theme.tertiary}>
                          <ServiceDetailsText color={theme.light}>{item.date} as {item.hour}h</ServiceDetailsText>
                        </ServiceDetailsItem>
                      </ServiceDetails>
                    </AppointmentDesc>
                  </AppointmentDetails>
                </AppointmentItem>
              ))}
            </AppointmentsArea>
          }
        </PageBody>
      </Scroller>
    </Container>
  );
}