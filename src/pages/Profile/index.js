import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../services/Api';

import {
  Container,
  Scroller,
  HeaderBody,
  MaskHeader,
  PageBody,
  ProfileOptions,
  ProfileImageArea,
  ProfileImage,
  ProfileData,
  ProfileDataText,
  ProfileDataTextBold,
  ProfileItem,
  ProfileText,
  SignatureArea,
  SignatureText,
  SignatureTextBold,
} from './styles';

import { UserContext } from '../../contexts/UserContext';

import Icon from 'react-native-vector-icons/AntDesign';
import { theme } from '../../styles/globalStyles';
import StatusBar from '../../components/StatusBar';
import MaskLoading from '../../components/MaskLoading';
import Header from '../../components/Header';

const styles = StyleSheet.create({
  header: { marginTop: 20 }
});

export default () => {
  const navigation = useNavigation();
  const { state: user } = useContext(UserContext);
  const [mask, setMask] = useState(false);

  const handleLogoutClick = async () => {
    setMask(true);
    let token = await AsyncStorage.getItem('token');
    if (token) {
      let json = await Api.post('/auth/logout', {
        token: token
      });

      if (json.data.status) {
        await AsyncStorage.removeItem('token');
        navigation.reset({
          routes: [{ name: 'Login' }]
        })
      } else {
        alert('Erro: ' + json.data.error);
      }
    } else {
      alert('Ocorreu um erro desconhecido.');
    }
    setMask(false);
  }

  return (
    <Container>
      {mask && <MaskLoading />}
      <Scroller>
        <HeaderBody styles={styles.header} source={require('../../assets/image_profile.jpg')} resizeMode="cover">
          <StatusBar backgroundColor={theme.transparent} barStyle="light-content" />
          <MaskHeader />
          <Header light="false" />
          <ProfileImageArea>
            <ProfileImage source={require('../../assets/user.jpg')} />
          </ProfileImageArea>
          <ProfileData>
            <ProfileDataTextBold>{user.name} {user.lastname}</ProfileDataTextBold>
            <ProfileDataText>{user.email}</ProfileDataText>
          </ProfileData>
        </HeaderBody>
        <PageBody>
          <ProfileOptions>
            <ProfileItem onPress={() => navigation.navigate('User')}>
              <Icon name="edit" size={15} color="#ffffff" />
              <ProfileText>Editar meus dados</ProfileText>
            </ProfileItem>
            <ProfileItem onPress={() => navigation.navigate('Password')}>
              <Icon name="lock" size={15} color="#ffffff" />
              <ProfileText>Alterar senha</ProfileText>
            </ProfileItem>
            <ProfileItem onPress={handleLogoutClick}>
              <Icon name="logout" size={15} color={theme.primary} />
              <ProfileText color={theme.primary}>Sair</ProfileText>
            </ProfileItem>
          </ProfileOptions>
        </PageBody>
      </Scroller>
      <SignatureArea>
        <Icon name="hearto" size={20} color={theme.primary} />
        <SignatureText>Produzido por</SignatureText>
        <SignatureTextBold>MangaCode</SignatureTextBold>
      </SignatureArea>
    </Container>
  );
}