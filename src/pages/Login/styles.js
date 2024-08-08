import React from 'react';
import styled from 'styled-components/native';
import { theme, padding } from '../../styles/globalStyles';

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.silver};
    justify-content: center;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const PageBody = styled.View`
    justify-content: center;
    padding: 0 ${padding.paddingDefault} 0 ${padding.paddingDefault};
`;

export const Logo = styled.Image`
    width: 100px;
    height: 100px;
`;

export const TitleArea = styled.View`
    margin-top: 20px;
`;

export const TitleText = styled.Text`
    font-size: 20px;
    color: ${theme.dark};
`;

export const TitleTextBold = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${theme.dark};
`;

export const InputArea = styled.View`
    margin-top: 25px;
`;

export const ButtonArea = styled.View`
    margin-top: 20px;
`;

export const Button = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    border-radius: 50px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${theme.primary};
`;

export const ButtonText = styled.Text`
    font-size: 15px;
    color: ${theme.light};
    text-transform: uppercase;
    margin-left: 10px;
`;

export const ButtonSubscriberArea = styled.TouchableOpacity`
    height: 30px;
    margin-top: 15px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`;

export const ButtonSubscriberText = styled.Text`
    font-size: 13px;
    color: ${theme.dark};
    margin-right: 5px;
`;

export const ButtonSubscriberTextBold = styled.Text`
    font-size: 13px;
    color: ${theme.dark};
    font-weight: bold;
`;

