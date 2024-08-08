import React, { useEffect, useContext } from 'react';
import StatusBar from '../../components/StatusBar';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../contexts/UserContext';
import Api from '../../services/Api';
import {
    Container,
    TravelLogo,
    LoadingIcon
} from './styles';

import { theme } from '../../styles/globalStyles';

import { useNavigation } from '@react-navigation/native';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            const welcome = await AsyncStorage.getItem('welcome');
            if (token) {
                /** AUTENTICA TOKEN VIA API */
                let json = await Api.post('/auth', {
                    token: token
                });
                if (json.data.status) {
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
                        routes: [{ name: 'MainTab' }]
                    })
                } else {
                    navigation.reset({
                        routes: [{ name: 'Login' }]
                    })
                }
            } else {
                /** VERIFICA SE O USUÁRIO JÁ PASSOU PELA TELA WELCOME */
                if (welcome) {
                    navigation.reset({
                        routes: [{ name: 'Login' }]
                    })
                } else {
                    navigation.reset({
                        routes: [{ name: 'Welcome' }]
                    })
                }
            }
        }
        checkToken();
    }, []);

    return (
        <Container>
            <StatusBar backgroundColor={theme.primary} barStyle="light-content" />
            <TravelLogo source={require('../../assets/logo2.png')} />
            <LoadingIcon size="large" color={theme.light} />
        </Container>
    );
}