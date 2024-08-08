import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../services/Api';

import {
  Container,
  Scroller,
  LoadingIcon,
  PageBody,
  ServicesArea,
  Service
} from './styles';

import { theme } from '../../styles/globalStyles';
import StatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import ServiceItem from '../../components/ServiceItem';
import Trigger from '../../components/TriggerError';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listServices, setListServices] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const category = {
    id: route.params.id,
    title: route.params.title
  };

  const getServicesCategory = async () => {
    setLoading(true);
    setListServices([]);

    let token = await AsyncStorage.getItem('token');
    let json = await Api.get('/services/c/' + category.id + '&token=' + token);
    if (token) {
      if (json.data.status) {
        setListServices(json.data.data.services);
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

    setLoading(false);
  }

  useEffect(() => {
    getServicesCategory();
  }, [category.id]);

  return (
    <Container>
      <StatusBar backgroundColor={theme.silver} barStyle="dark-content" />
      {error && <Trigger type={error.type} description={error.description} />}
      <Scroller>
        <Header title={category.title} />
        <PageBody>
          {loading && <LoadingIcon size="large" color="#000000" />}

          {listServices && listServices.length > 0 && 
            <ServicesArea>
              {listServices.map((serv, k) => (
                <Service key={k}>
                  <ServiceItem data={serv} />
                </Service>
              ))}
            </ServicesArea>
          }
        </PageBody>
      </Scroller>
    </Container>
  );
}