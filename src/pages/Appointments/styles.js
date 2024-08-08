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

export const PageBody = styled.View`
    padding: ${padding.paddingDefault};
`;

export const PageSubtitleText = styled.Text`
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const AppointmentsArea = styled.View``;

export const AppointmentItem = styled.View`
    padding: ${padding.paddingLow};
    background-color: ${theme.light};
    border-radius: 20px;
    margin-bottom: 20px;
    flex-direction: row;
`;

export const ServicePhoto = styled.Image`
    width: 100px;
    height: 80px;
    border-radius: 10px;
    margin-right: 15px;
    background-color: red;
`;

export const AppointmentDetails = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
`;

export const AppointmentDesc = styled.View``;

export const ServiceTitleText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${theme.dark};
`;

export const ServiceDetails = styled.View`
    margin-top: 10px;
`;

export const ServiceDetailsItem = styled.View`
    margin-bottom: 5px;
    padding: 5px 10px;
    background-color: ${props => props.backgroundColor != null ? props.backgroundColor : theme.silver};
    border-radius: 10px;
`;

export const ServiceDetailsText = styled.Text`
    font-size: 11px;
    font-weight: bold;
    color: ${props => props.color != null ? props.color : theme.dark};
`;

export const LoadingIcon = styled.ActivityIndicator``;
