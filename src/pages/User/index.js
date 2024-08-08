import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../services/Api';

import {
  Container,
  Scroller,
  PageBody,
  SubTitlePage,
  Button,
  ButtonText
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
  const { dispatch: userDispatch } = useContext(UserContext);
  const [mask, setMask] = useState(false);
  const [error, setError] = useState(false);
  const [nameField, setNameField] = useState(user.name);
  const [lastNameField, setlastNameField] = useState(user.lastname);
  const [emailField, setEmailField] = useState(user.email);
  const mounted = useRef(1);

  useEffect(() => {
    mounted.current = 1;
    return () => { mounted.current = 0 };
  }, []);

  const handleSaveProfile = async () => {
    setMask(true);

    let token = await AsyncStorage.getItem('token');
    if (token) {
      let json = await Api.post('/user/update', {
        token: token,
        name: nameField,
        lastname: lastNameField,
        email: emailField
      });
      if (json.data.status) {
        userDispatch({
          type: 'setProfile',
          payload: {
            name: nameField,
            lastname: lastNameField,
            email: emailField,
          }
        });
        setError({
          description: "Seus dados foram atualizados com sucesso.",
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
        <Header title="Meus dados" />
        <PageBody>
          <SubTitlePage>Edite os seus dados através dos campos abaixo:</SubTitlePage>
          <Input
            Title={"Nome"}
            Icon={"user"}
            placeholder="Digite o seu nome"
            value={nameField}
            onChangeText={t => setNameField(t)}
          />
          <Input
            Title={"Sobrenome"}
            Icon={"user"}
            placeholder="Digite o seu sobrenome"
            value={lastNameField}
            onChangeText={t => setlastNameField(t)}
          />
          <Input
            Title={"E-mail"}
            Icon={"envelope"}
            placeholder="Digite o seu e-mail"
            value={emailField}
            onChangeText={t => setEmailField(t)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Button onPress={handleSaveProfile}>
            <Icon name="check" size={15} color="#ffffff" />
            <ButtonText>Salvar dados</ButtonText>
          </Button>
        </PageBody>
      </Scroller>
    </Container >
  );
}