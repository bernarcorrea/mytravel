import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Scroller,
  PageBody,
  LoadingIcon,
  FavoritesArea,
  FavoritesSubtitle,
  Service,
  ServiceButtonFav
} from './styles';

import Api from '../../services/Api';

import { UserContext } from '../../contexts/UserContext';

import { theme } from '../../styles/globalStyles';
import StatusBar from '../../components/StatusBar';
import Trigger from '../../components/TriggerError';
import MaskLoading from '../../components/MaskLoading';
import Header from '../../components/Header';
import ServiceItem from '../../components/ServiceItem';
import Icon from 'react-native-vector-icons/AntDesign';

export default () => {
  const navigation = useNavigation();
  const { state: user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [mask, setMask] = useState(false);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getFavorites = async () => {
    setLoading(true);
    setList([]);

    let token = await AsyncStorage.getItem('token');
    if (token) {
      let json = await Api.get('/favorites&token=' + token);
      if (json.data.status) {
        setList(json.data.data)
      }
    } else {
      setError({
        description: "Ocorreu um erro inesperado.",
        type: "error"
      });
    }

    setLoading(false);
  }

  const handleSetFavorite = async (service) => {
    setMask(true);

    let token = await AsyncStorage.getItem('token');
    if (token) {
      let json = await Api.post('/favorites/set', {
        token: token,
        service: service,
        user: user.id
      });
      if (json.data.status) {
        getFavorites();
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

    setMask(false);
  }

  const onRefresh = () => {
    setRefreshing(false);
    getFavorites();
  }

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor={theme.silver} barStyle="dark-content" />
      {mask && <MaskLoading />}
      {error && <Trigger type={error.type} description={error.description} />}
      <Scroller refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <Header title="Favoritos" />
        <PageBody>
          {loading && <LoadingIcon size="large" color="#000000" />}
          {list && list.length > 0 &&
            <FavoritesArea>
              <FavoritesSubtitle>Você salvou os seguintes os itens abaixo nos seus favoritos:</FavoritesSubtitle>
              {list.map((serv, k) => (
                <Service key={k}>
                  <ServiceButtonFav onPress={() => handleSetFavorite(serv.id)}>
                    <Icon name="heart" size={20} color="#f00000" />
                  </ServiceButtonFav>
                  <ServiceItem data={serv} />
                </Service>
              ))}
            </FavoritesArea>
          }
        </PageBody>
      </Scroller>
    </Container>
  );
}