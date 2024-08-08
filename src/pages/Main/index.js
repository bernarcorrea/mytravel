import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl, View } from 'react-native';
import StatusBar from '../../components/StatusBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';
import { imagesCategory } from '../../services/Constants';

import {
  Container,
  Scroller,
  LoadingIcon,
  Header,
  HeaderTitle,
  HeaderOptions,
  SearchIcon,
  HeaderAvatar,
  AvatarImage,
  PageBody,
  CategoryArea,
  CategoryItem,
  CategoryImage,
  CategoryTitle,
  LastServiceArea,
  ServiceTitle,
  LastService,
  LastServiceItem,
  LastServiceMask,
  LastServiceImage,
  LastServiceItemCate,
  LastServiceItemHeader,
  LastServiceItemTitle,
  LastServiceItemTitlePoint,
  ContentProfileArea,
  ProfileTitle,
  ProfileArea,
  ProfileItem,
  ProfileText,
  ProfileTextBold,
  ButtonProfile,
  ButtonProfileText,
} from './styles';


import Api from '../../services/Api';

import Icon from 'react-native-vector-icons/AntDesign';

import Trigger from '../../components/TriggerError';
import { theme } from '../../styles/globalStyles';

export default ({ state }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [listLastServices, setListLastServices] = useState([]);
  const { state: user } = useContext(UserContext);
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

  const getLastServices = async () => {
    setLoading(true);
    setListLastServices([]);

    let token = await AsyncStorage.getItem('token');
    let json = await Api.get('/services/last&token=' + token);
    if (json.data.status) {
      setListLastServices(json.data.data);
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

  const handleProfileClick = () => {
    navigation.navigate('Profile');
  }

  const handleSearchClick = () => {
    navigation.navigate('Search');
  }

  const handleSelectService = (data) => {
    navigation.navigate('Service', {
      id: data.id,
      title: data.title,
      cover: data.cover,
      price: data.price,
      category: data.category
    });
  }

  useEffect(() => {
    getCategories();
    getLastServices();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getCategories();
    getLastServices()
  }

  return (
    <Container>
      <StatusBar backgroundColor={theme.silver} barStyle="dark-content" />
      <Scroller refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <Header>
          <HeaderTitle>Descubra.</HeaderTitle>
          <HeaderOptions>
            <SearchIcon onPress={handleSearchClick}>
              <Icon name="search1" size={25} color="#111111" />
            </SearchIcon>
            <HeaderAvatar onPress={handleProfileClick}>
              <AvatarImage source={require('../../assets/user.jpg')} />
            </HeaderAvatar>
          </HeaderOptions>
        </Header>
        <PageBody>
          {loading &&
            <LoadingIcon size="large" color="#000000" />
          }

          {listCategory && listCategory.length > 0 &&
            <CategoryArea>
              {listCategory.map((cate, k) => (
                <CategoryItem key={k} onPress={() => handleCategorySelect(cate)}>
                  <CategoryImage source={imagesCategory[cate.id]} />
                  <CategoryTitle>{cate.title}</CategoryTitle>
                </CategoryItem>
              ))}
            </CategoryArea>
          }
          {listLastServices && listLastServices.length > 0 &&
            <LastServiceArea>
              <ServiceTitle>Últimos cadastrados:</ServiceTitle>
              <LastService horizontal={true}>
                {listLastServices.map((serv, k) => (
                  <LastServiceItem key={k} onPress={() => handleSelectService(serv)}>
                    <LastServiceMask />
                    <LastServiceImage source={{ uri: serv.cover }} resizeMode="cover" />
                    <LastServiceItemCate>{serv.category}</LastServiceItemCate>
                    <LastServiceItemHeader>
                      <LastServiceItemTitle>{serv.title}</LastServiceItemTitle>
                      <LastServiceItemTitlePoint />
                    </LastServiceItemHeader>
                  </LastServiceItem>
                ))}
              </LastService>
            </LastServiceArea>
          }
          <ContentProfileArea>
            <ProfileTitle>Seu perfil:</ProfileTitle>
            <ProfileArea>
              <ProfileItem>
                <ProfileText>Nome:</ProfileText>
                <ProfileTextBold>{user.name} {user.lastname}</ProfileTextBold>
              </ProfileItem>
              <ProfileItem>
                <ProfileText>E-mail:</ProfileText>
                <ProfileTextBold>{user.email}</ProfileTextBold>
              </ProfileItem>
              <ProfileItem>
                <ProfileText>Senha:</ProfileText>
                <ProfileTextBold>******</ProfileTextBold>
              </ProfileItem>
              <ButtonProfile onPress={handleProfileClick}>
                <Icon name="edit" size={15} color="#ffffff" />
                <ButtonProfileText>Editar perfil</ButtonProfileText>
              </ButtonProfile>
            </ProfileArea>
          </ContentProfileArea>
        </PageBody>
      </Scroller>
    </Container>
  )
}