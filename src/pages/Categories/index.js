import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../services/Api';
import { imagesCategory } from '../../services/Constants';

import {
  Container,
  Scroller,
  LoadingIcon,
  PageBody,
  CategoryArea,
  CategoryItem,
  CategoryItemImage,
  CategoryItemText,
  CategorySubtitleText
} from './styles';

import { theme } from '../../styles/globalStyles';
import StatusBar from '../../components/StatusBar';
import Header from '../../components/Header';

export default () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    setListCategory([]);

    let token = await AsyncStorage.getItem('token');
    let json = await Api.get('/category&token=' + token);
    if (json.data.status) {
      setListCategory(json.data.data);
    } else {
      alert("Erro:" + json.data.error);
    }

    setLoading(false);
  }

  const handleCategorySelect = (data) => {
    navigation.navigate('Category', {
      id: data.id,
      title: data.title
    })
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor={theme.silver} barStyle="dark-content" />
      <Scroller>
        <Header title="Categorias" />
        <PageBody>
          {loading && <LoadingIcon size="large" color="#000000" /> }
          {listCategory && listCategory.length > 0 &&
            <CategoryArea>
              <CategorySubtitleText>Navegue entre as categorias abaixo para ter acesso aos seus serviços:</CategorySubtitleText>
              {listCategory.map((cate, k) => (
                <CategoryItem key={k} onPress={() => handleCategorySelect(cate)}>
                  <CategoryItemImage source={imagesCategory[cate.id]} />
                  <CategoryItemText>{cate.title}</CategoryItemText>
                </CategoryItem>
              ))}
            </CategoryArea>
          }
        </PageBody>
      </Scroller>
    </Container>
  );
}