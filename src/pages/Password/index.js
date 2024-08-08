import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../services/Api';

import {
  Container,
  Scroller,
  PageBody,
  SubTitlePage,
  Button,
  ButtonText,
} from './styles';

import { UserContext } from '../../contexts/UserContext';

import { theme } from '../../styles/globalStyles';

import StatusBar from '../../components/StatusBar';
import Trigger from '../../components/TriggerError';
import MaskLoading from '../../components/MaskLoading';
import Input from '../../components/InputLogin';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/AntDesign';

export default () => {
  const navigation = useNavigation();
  const { state: user } = useContext(UserContext);
  const [mask, setMask] = useState(false);
  const [error, setError] = useState(false);
  const [passwordField, setPasswordField] = useState('');
  const [confirmPasswordField, setConfirmPasswordField] = useState('');
  const mounted = useRef(1);

  useEffect(() => {
    mounted.current = 1;
    return () => { mounted.current = 0 };
  }, []);

  const handleSaveProfile = async () => {
    setMask(true);
    let token = await AsyncStorage.getItem('token');
    if (token) {
      let json = await Api.post('/user/password', {
        token: token,
        password: passwordField,
        password_confirm: confirmPasswordField
      });
      if (json.data.status) {
        setError({
          description: "Sua senha foi alterarda com sucesso.",
          type: "success"
        });
      } else {
        setError({
          description: json.data.error,
          type: "error"
        });
      }
    } else {
      setError({
        description: "Ocorreu um erro desconhecido.",
        type: "error"
      });
    }
    setTimeout(() => {
      if (mounted.current) {
        setError(false);
      }
    }, 3000);

    setMask(false);
  }

  return (
    <Container>
      {mask && <MaskLoading />}
      {error && <Trigger type={error.type} description={error.description} />}
      <StatusBar backgroundColor={theme.silver} barStyle="dark-content" />
      <Scroller>
        <Header title="Alterar senha" />
        <PageBody>
          <SubTitlePage>Insira uma nova senha através dos campos abaixo:</SubTitlePage>
          <Input
            Title={"Senha"}
            Icon={"lock"}
            placeholder="Digite sua nova senha"
            value={passwordField}
            onChangeText={t => setPasswordField(t)}
            password={true}
          />
          <Input
            Title={"Confirme sua senha"}
            Icon={"lock"}
            placeholder="Digite novamente sua nova senha"
            value={confirmPasswordField}
            onChangeText={t => setConfirmPasswordField(t)}
            password={true}
          />
          <Button onPress={handleSaveProfile}>
            <Icon name="check" size={15} color="#ffffff" />
            <ButtonText>Alterar senha</ButtonText>
          </Button>
        </PageBody>
      </Scroller>
    </Container >
  );
}