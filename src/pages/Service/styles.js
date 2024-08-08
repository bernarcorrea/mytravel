import React from 'react';
import styled from 'styled-components/native';

import { theme, padding } from '../../styles/globalStyles';

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.silver};
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 20px;
`;

export const HeaderBody = styled.ImageBackground`
    position: relative;
    height: 300px;
`;

export const HeaderBodyNav = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const HeaderInfo = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between; 
`;

export const HeaderTitle = styled.View``;

export const HeaderTitleText = styled.Text`
    font-size: 23px;
    font-weight: bold;
    color: ${theme.dark};
`;

export const HeaderTitleCategory = styled.Text`
    font-size: 12px;
    color: ${theme.primary};
    text-transform: uppercase;
`;

export const HeaderPrice = styled.View``;

export const HeaderPriceText = styled.Text`
    font-size: 23px;
    color: ${theme.primary};
    text-transform: uppercase;
    font-weight: bold;
`;

export const HeaderFavButton = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    margin-right: ${padding.paddingDefault};
`;

export const PageBody = styled.View`
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    margin-top: -40px;
    background-color: ${theme.silver};
    padding: ${padding.paddingDefault} ${padding.paddingDefault} 110px ${padding.paddingDefault};
`;

export const ServiceNavArea = styled.View`
    margin-top: 20px;
`;

export const ServiceNavMenu = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const ServiceNavItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 30px;
`;

export const ServiceNavItemText = styled.Text`
    font-size: 13px;
    color: #777777;
    margin: 0 5px;
`;

export const ServiceNavContent = styled.View`
    margin-top: 20px;
`;

export const ServiceNavContentText = styled.Text`
    font-size: 13px;
    color: #333333;
    line-height: 21px;
`;

export const TabCheckout = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    padding: 15px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-top-width: 1px;
    border-top-color: rgba(0,0,0,0.1);
`;

export const CheckoutPrice = styled.View`
    padding: 12px 20px;
    border: 2px solid ${theme.primary};
    border-radius: 40px;
    margin-right: 10px;
`;

export const CheckoutPriceText = styled.Text`
    font-size: 17px;
    color: ${theme.primary};
    font-weight: bold;
`;

export const CheckoutButton = styled.TouchableOpacity`
    padding: 14px 20px;
    border-radius: 40px;
    background-color: ${theme.primary};
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const CheckoutButtonText = styled.Text`
    font-size: 13px;
    color: ${theme.light};
    text-transform: uppercase;
    margin-left: 5px;
`;

export const ServiceNavContentRates = styled.View``;

export const ServiceRatesItem = styled.View`
    margin-bottom: 20px;
    padding: ${padding.paddingLow};
    border-radius: 20px;
    background-color: ${theme.light};
`;

export const ServiceRatesItemName = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: ${theme.dark};
`;

export const ServiceRatesItemStar = styled.View`
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
`;

export const ServiceRatesItemStarText = styled.Text`
    font-size: 13px;
    font-weight: bold;
    margin-left: 2px;
    color: ${theme.dark};
`;

export const ServiceRatesItemDesc = styled.Text`
    font-size: 13px;
    color: #777777;
`;




