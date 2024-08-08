import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Scroller,
  PageBody,
  SearchInputArea,
  SearchInput,
  SearchResultArea,
  SearchResultSubtitle,
  Service
} from './styles';

import Api from '../../services/Api';

import { theme } from '../../styles/globalStyles';
import StatusBar from '../../components/StatusBar';
import Trigger from '../../components/TriggerError';
import MaskLoading from '../../components/MaskLoading';
import Header from '../../components/Header';
import ServiceItem from '../../components/ServiceItem';
import Icon from 'react-native-vector-icons/AntDesign';

export default () => {
  const [mask, setMask] = useState(false);
  const [error, setError] = useState(false);
  const [searchField, setSearchField] = useState('');
  const [list, setList] = useState([]);

  const handleSearch = async () => {
    setMask(true);
    setList([]);

    let token = await AsyncStorage.getItem('token');
    if (token) {
      let json = await Api.post('/services/search', {
        token: token,
        search: searchField
      });
      if (json.data.status) {
        setList(json.data.data)
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

  return (
    <Container>
      <StatusBar backgroundColor={theme.silver} barStyle="dark-content" />
      {mask && <MaskLoading />}
      {error && <Trigger type={error.type} description={error.description} />}
      <Scroller>
        <Header title="Buscar" />
        <PageBody>
          <SearchInputArea>
            <Icon name="search1" size={15} color={theme.dark} />
            <SearchInput
              placeholder="O que você quer buscar?"
              value={searchField}
              onChangeText={t => setSearchField(t)}
              onSubmitEditing={handleSearch}
            />
          </SearchInputArea>
          {list && list.length > 0 &&
            <SearchResultArea>
              <SearchResultSubtitle>Sua busca retornou os seguintes resultados:</SearchResultSubtitle>
              {list.map((serv, k) => (
                <Service key={k}>
                  <ServiceItem data={serv} />
                </Service>
              ))}
            </SearchResultArea>
          }
        </PageBody>
      </Scroller>
    </Container >
  );
}