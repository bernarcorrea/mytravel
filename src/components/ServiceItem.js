import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { theme } from '../styles/globalStyles';

import Icon from 'react-native-vector-icons/AntDesign';

const ServiceItem = styled.TouchableOpacity`
    position: relative;
    border-radius: 20px;
`;

const ServiceMask = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    border-radius: 20px;
    background-color: ${theme.mask};
`;

const ServiceImage = styled.Image`
    width: 100%;
    height: 130px;
    border-radius: 20px;
`;

const ServiceTitle = styled.View`
    position: absolute;
    z-index: 3;
    bottom: 40px;
    left: 20px;
`;

const ServiceTitleText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.light};
`;

const ServicePrice = styled.View`
    position: absolute;
    z-index: 3;
    bottom: 20px;
    left: 20px;
`;

const ServicePriceText = styled.Text`
    font-size: 13px;
    color: ${theme.light};
`;

export default ({ data }) => {
    const navigation = useNavigation();

    const handleSelectService = () => {
        navigation.navigate('Service', {
            id: data.id,
            title: data.title,
            cover: data.cover,
            price: data.price,
            category: data.category
        });
    }

    return (
        <ServiceItem onPress={handleSelectService}>
            <ServiceMask />
            <ServiceImage source={{ uri: data.cover }} resizeMode="cover" />
            <ServiceTitle>
                <ServiceTitleText>{data.title}</ServiceTitleText>
            </ServiceTitle>
            <ServicePrice>
                <ServicePriceText>R$ {data.price}</ServicePriceText>
            </ServicePrice>
        </ServiceItem>
    );
}