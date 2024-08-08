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
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: ${padding.paddingDefault};
`;

export const Logo = styled.Image`
    width: 60px;
    height: 60px;
`;

export const TitleArea = styled.View`
    margin-top: 30px;
`;

export const TitleText = styled.Text`
    font-size: 25px;
    color: ${theme.dark};
    text-align: center;
`;

export const TitleTextBold = styled.Text`
    font-size: 25px;
    font-weight: bold;
    color: ${theme.dark};
`;

export const ImageWelcome = styled.Image`
    width: 250px;
    height: 250px;
    margin-top: 30px;
`;

export const Button = styled.TouchableOpacity`
    margin-top: 30px;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.primary};
    color: ${theme.light};
`;
