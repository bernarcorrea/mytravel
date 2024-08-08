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
    padding: 0 ${padding.paddingDefault};
    margin-top: 30px;
`;

export const SubTitlePage = styled.Text`
    font-size: 20px;
    color: ${theme.dark};
    margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    border-radius: 50px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${theme.primary};
    margin-top: 20px;
`;

export const ButtonText = styled.Text`
    font-size: 15px;
    color: ${theme.light};
    text-transform: uppercase;
    margin-left: 10px;
`;



