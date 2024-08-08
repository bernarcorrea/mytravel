import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';

import {
    Container,
    Scroller,
    PageBody,
    Logo,
    TitleArea,
    TitleText,
    TitleTextBold,
    InputArea,
    ButtonArea,
    Button,
    ButtonText,
    ButtonSubscriberArea,
    ButtonSubscriberText,
    ButtonSubscriberTextBold,
} from './styles';

import Api from '../../services/Api';

import { theme } from '../../styles/globalStyles';

import StatusBar from '../../components/StatusBar';
import Input from '../../components/InputLogin';
import Trigger from '../../components/TriggerError';
import MaskLoading from '../../components/MaskLoading';
import Icon from 'react-native-vector-icons/FontAwesome';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [passwordConfirmField, setPasswordConfirmField] = useState('');
    const [nameField, setNameField] = useState('');
    const [lastnameField, setLastNameField] = useState('');
    const [mask, setMask] = useState(false);
    const [error, setError] = useState(false);
    const mounted = useRef(1);

    useEffect(() => {
        mounted.current = 1;
        return () => { mounted.current = 0 };
      }, []);

    const handleClickRegister = async () => {
        setMask(true);
        let json = await Api.post('/user/create', {
            name: nameField,
            lastname: lastnameField,
            email: emailField,
            password: passwordField,
            password_confirm: passwordConfirmField,
        });
        if (json.data.status) {
            if (json.data.data.token) {
                await AsyncStorage.setItem('token', json.data.data.token);
                userDispatch({
                    type: "setProfile",
                    payload: {
                        id: json.data.data.id,
                        name: json.data.data.name,
                        lastname: json.data.data.lastname,
                        email: json.data.data.email,
                        avatar: json.data.data.cover,
                    }
                });
                navigation.reset({
                    routes: [{ name: "MainTab" }]
                })
            }
        } else {
            setError({
                description: json.data.error,
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

    const handleClickLogin = () => {
        navigation.reset({
            routes: [{ name: "Login" }]
        })
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.silver} barStyle="dark-content" />
            {mask && <MaskLoading />}
            {error && <Trigger type={error.type} description={error.description} />}
            <Scroller>
                <PageBody>
                    <Logo source={require('../../assets/logo.png')} />
                    <TitleArea>
                        <TitleText>Preencha os dados para se</TitleText>
                        <TitleTextBold>Cadastrar.</TitleTextBold>
                    </TitleArea>
                    <InputArea>
                        <Input
                            Title={"Nome"}
                            Icon={"user"}
                            placeholder="Digite seu nome"
                            value={nameField}
                            onChangeText={t => setNameField(t)}
                        />
                        <Input
                            Title={"Sobrenome"}
                            Icon={"user"}
                            placeholder="Digite seu sobrenome"
                            value={lastnameField}
                            onChangeText={t => setLastNameField(t)}
                        />
                        <Input
                            Title={"E-mail"}
                            Icon={"envelope"}
                            placeholder="Digite seu e-mail"
                            value={emailField}
                            onChangeText={t => setEmailField(t)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Input
                            Title={"Senha"}
                            Icon={"lock"}
                            placeholder="Digite sua senha"
                            value={passwordField}
                            onChangeText={t => setPasswordField(t)}
                            password={true}
                        />
                        <Input
                            Title={"Confirme sua senha"}
                            Icon={"lock"}
                            placeholder="Confirme a sua senha"
                            value={passwordConfirmField}
                            onChangeText={t => setPasswordConfirmField(t)}
                            password={true}
                        />
                    </InputArea>
                    <ButtonArea>
                        <Button onPress={handleClickRegister}>
                            <Icon name="check" size={15} color="#ffffff" />
                            <ButtonText>Cadastrar</ButtonText>
                        </Button>
                    </ButtonArea>
                    <ButtonSubscriberArea onPress={handleClickLogin}>
                        <ButtonSubscriberText>Já tem uma conta?</ButtonSubscriberText>
                        <ButtonSubscriberTextBold>Faça login!</ButtonSubscriberTextBold>
                    </ButtonSubscriberArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}