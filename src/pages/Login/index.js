import React, { useState, useContext, useRef, useEffect } from 'react';
import StatusBar from '../../components/StatusBar';
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

import Input from '../../components/InputLogin';
import Trigger from '../../components/TriggerError';
import MaskLoading from '../../components/MaskLoading';
import Icon from 'react-native-vector-icons/FontAwesome';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [mask, setMask] = useState(false);
    const [error, setError] = useState(false);
    const mounted = useRef(1);
    
    useEffect(() => {
        mounted.current = 1;
        return () => { mounted.current = 0 };
      }, []);

    const handleClickLogin = async () => {
        setMask(true);
        let json = await Api.post('/auth/login', {
            email: emailField,
            password: passwordField
        });
        if (json.data.status) {
            await AsyncStorage.setItem('token', json.data.data.token);
            userDispatch({
                type: 'setProfile',
                payload: {
                    id: json.data.data.id,
                    name: json.data.data.name,
                    lastname: json.data.data.lastname,
                    email: json.data.data.email,
                    avatar: json.data.data.cover
                }
            });
            navigation.reset({
                routes: [{ name: "MainTab" }]
            })
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

    const handleClickSubs = () => {
        navigation.reset({
            routes: [{ name: "Register" }]
        })
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.silver} barStyle="dark-content" />
            {mask && <MaskLoading />}
            {error && <Trigger type={error.type} description={error.description} />}
                <PageBody>
                    <Logo source={require('../../assets/logo.png')} />
                    <TitleArea>
                        <TitleText>Preencha para fazer</TitleText>
                        <TitleTextBold>Login.</TitleTextBold>
                    </TitleArea>
                    <InputArea>
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
                    </InputArea>
                    <ButtonArea>
                        <Button onPress={handleClickLogin}>
                            <Icon name="check" size={15} color="#ffffff" />
                            <ButtonText>Acessar</ButtonText>
                        </Button>
                    </ButtonArea>
                    <ButtonSubscriberArea onPress={handleClickSubs}>
                        <ButtonSubscriberText>Ainda não tem uma conta?</ButtonSubscriberText>
                        <ButtonSubscriberTextBold>Cadastre-se!</ButtonSubscriberTextBold>
                    </ButtonSubscriberArea>
                </PageBody>
        </Container>
    );
}