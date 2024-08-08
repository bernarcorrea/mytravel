import React, { useContext, useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {
    Container,
    Scroller,
    HeaderBody,
    HeaderBodyNav,
    PageBody,
    HeaderInfo,
    HeaderTitle,
    HeaderTitleText,
    HeaderTitleCategory,
    HeaderPrice,
    HeaderPriceText,
    HeaderFavButton,
    ServiceNavArea,
    ServiceNavMenu,
    ServiceNavItem,
    ServiceNavItemText,
    ServiceNavContent,
    ServiceNavContentText,
    TabCheckout,
    CheckoutButton,
    CheckoutButtonText,
    CheckoutPrice,
    CheckoutPriceText,
    LoadingIcon,
    ServiceNavContentRates,
    ServiceRatesItem,
    ServiceRatesItemName,
    ServiceRatesItemDesc,
    ServiceRatesItemStar,
    ServiceRatesItemStarText
} from './styles';

import Api from '../../services/Api';

import { UserContext } from '../../contexts/UserContext';

import Icon from 'react-native-vector-icons/AntDesign';
import { theme } from '../../styles/globalStyles';
import StatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import ServiceModal from '../../components/ServiceModal';

export default () => {
    const route = useRoute();
    const { state: user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState(1);
    const [favorite, setFavorite] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [serviceInfo, setServiceinfo] = useState({
        id: route.params.id,
        title: route.params.title,
        cover: route.params.cover,
        price: route.params.price,
        category: route.params.category,
    });

    const getServiceData = async () => {
        setLoading(true);
        let token = await AsyncStorage.getItem('token');
        if (token) {
            let json = await Api.get('/service/' + serviceInfo.id + '&token=' + token);
            if (json.data.status) {
                setServiceinfo(json.data.data);
                setFavorite(json.data.data.favorite);
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
        setLoading(false);
    }

    const handleSetFavorite = async () => {
        let token = await AsyncStorage.getItem('token');
        if (token) {
            let json = await Api.post('/favorites/set', {
                token: token,
                service: serviceInfo.id,
                user: user.id
            });
            if (json.data.status) {
                if (favorite) {
                    setFavorite(false);
                } else {
                    setFavorite(true);
                }
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
    }

    const handleCheckoutService = () => {
        setShowModal(true);
    }

    const handleNavText = (key) => {
        setTab(key);
    }

    useEffect(() => {
        getServiceData();
    }, []);

    return (
        <Container>
            <Scroller>
                <HeaderBody source={{ uri: serviceInfo.cover }} resizeMode="cover">
                    <StatusBar backgroundColor={theme.transparent} barStyle="light-content" />
                    <HeaderBodyNav>
                        <Header light="false" />
                        <HeaderFavButton onPress={handleSetFavorite}>
                            {!favorite ?
                                <Icon name="hearto" size={20} color={theme.primary} />
                                :
                                <Icon name="heart" size={20} color={theme.primary} />
                            }
                        </HeaderFavButton>
                    </HeaderBodyNav>
                </HeaderBody>
                <PageBody>
                    <HeaderInfo>
                        <HeaderTitle>
                            <HeaderTitleText>{serviceInfo.title}</HeaderTitleText>
                            <HeaderTitleCategory>{serviceInfo.category}</HeaderTitleCategory>
                        </HeaderTitle>
                        <HeaderPrice>
                            <HeaderPriceText>R${serviceInfo.price}</HeaderPriceText>
                        </HeaderPrice>
                    </HeaderInfo>
                    <ServiceNavArea>
                        <ServiceNavMenu>
                            <ServiceNavItem onPress={() => handleNavText(1)}>
                                <Icon name="flag" size={13} color={tab == 1 ? theme.primary : '#777777'} />
                                <ServiceNavItemText style={tab == 1 ? { color: theme.primary } : { color: '#777777' }}>Sobre</ServiceNavItemText>
                            </ServiceNavItem>
                            <ServiceNavItem onPress={() => handleNavText(2)}>
                                <Icon name="inbox" size={13} color={tab == 2 ? theme.primary : '#777777'} />
                                <ServiceNavItemText style={tab == 2 ? { color: theme.primary } : { color: '#777777' }}>Detalhes</ServiceNavItemText>
                            </ServiceNavItem>
                            <ServiceNavItem onPress={() => handleNavText(3)}>
                                <Icon name="staro" size={13} color={tab == 3 ? theme.primary : '#777777'} />
                                <ServiceNavItemText style={tab == 3 ? { color: theme.primary } : { color: '#777777' }}>Avaliações</ServiceNavItemText>
                            </ServiceNavItem>
                        </ServiceNavMenu>

                        {loading && <LoadingIcon size="large" color="#000000" />}

                        {serviceInfo.description &&
                            <ServiceNavContent>
                                {tab == 1 && <ServiceNavContentText>{serviceInfo.description}</ServiceNavContentText>}
                                {tab == 2 && <ServiceNavContentText>{serviceInfo.details}</ServiceNavContentText>}
                                {tab == 3 && serviceInfo.rates &&
                                    <ServiceNavContentRates>
                                        {serviceInfo.rates.map((rate, k) => (
                                            <ServiceRatesItem key={k}>
                                                <ServiceRatesItemName>{rate.user}</ServiceRatesItemName>
                                                <ServiceRatesItemStar>
                                                    <Icon name="star" size={13} color="#ffcc29" />
                                                    <ServiceRatesItemStarText>{rate.rate}</ServiceRatesItemStarText>
                                                </ServiceRatesItemStar>
                                                <ServiceRatesItemDesc>{rate.description}</ServiceRatesItemDesc>
                                            </ServiceRatesItem>
                                        ))}
                                    </ServiceNavContentRates>
                                }
                            </ServiceNavContent>
                        }
                    </ServiceNavArea>
                </PageBody>
            </Scroller>

            <TabCheckout>
                <CheckoutPrice><CheckoutPriceText>R${serviceInfo.price}</CheckoutPriceText></CheckoutPrice>
                <CheckoutButton onPress={handleCheckoutService}>
                    <Icon name="heart" size={20} color={theme.light} />
                    <CheckoutButtonText>Reservar agora</CheckoutButtonText>
                </CheckoutButton>
            </TabCheckout>

            <ServiceModal
                show={showModal}
                setShow={setShowModal}
                service={serviceInfo}
            />
        </Container>
    );
}