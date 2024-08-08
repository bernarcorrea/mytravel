import React, { useRef } from 'react';
import StatusBar from '../../components/StatusBar';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    Scroller,
    PageBody,
    Logo,
    TitleArea,
    TitleText,
    TitleTextBold,
    ImageWelcome,
    Button
} from './styles';

import { useNavigation } from '@react-navigation/native';

import { theme } from '../../styles/globalStyles';

import Swiper from 'react-native-swiper';
import ButtonIcon from 'react-native-vector-icons/FontAwesome';

export default () => {
    const navigation = useNavigation();
    const swiper = useRef(null);

    const handleNextPage = () => {
        console.log(swiper)
        if (swiper && swiper.current) {
            console.log(swiper);
            swiper.current.scrollBy(1, true);
        }
    }

    const handleLoginPage = async () => {
        await AsyncStorage.setItem('welcome', "true");
        navigation.reset({
            routes: [{name: "Login"}]
        });
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.silver} barStyle="dark-content" />
            <Scroller>
                <Swiper
                    showsPagination={false}
                    ref={swiper}
                >
                    <PageBody>
                        <Logo source={require('../../assets/logo.png')} />
                        <TitleArea>
                            <TitleText>A melhor <TitleTextBold>experiência</TitleTextBold> na sua viagem.</TitleText>
                        </TitleArea>
                        <ImageWelcome source={require('../../assets/welcome1.jpg')} />
                        <Button onPress={() => handleNextPage()}>
                            <ButtonIcon name="angle-right" size={25} color="#ffffff" />
                        </Button>
                    </PageBody>
                    <PageBody>
                        <Logo source={require('../../assets/logo.png')} />
                        <TitleArea>
                            <TitleText>Restaurantes, hotéis, eventos e <TitleTextBold>muito mais.</TitleTextBold></TitleText>
                        </TitleArea>
                        <ImageWelcome source={require('../../assets/welcome2.jpg')} />
                        <Button onPress={handleLoginPage}>
                            <ButtonIcon name="angle-right" size={25} color="#ffffff" />
                        </Button>
                    </PageBody>
                </Swiper>
            </Scroller>
        </Container>
    );
}