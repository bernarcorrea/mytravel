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

export const SearchInputArea = styled.View`
    flex-direction: row;
    align-items: center;
    height: 50px;
    font-size: 15px;
    color: ${theme.dark};
    border-radius: 40px;
    background-color: ${theme.light};
    padding: 0 25px 0 10px;
`;

export const SearchInput = styled.TextInput`
    flex: 1;
    font-size: 15px;
    color: ${theme.dark};
    padding-left: 10px;
`;

export const SearchResultArea = styled.View`
    margin-top: 20px;
`;

export const SearchResultSubtitle = styled.Text`
    font-size: 16px;
    color: ${theme.dark};
    margin-bottom: 20px;
`;

export const Service = styled.View`
    margin-bottom: 20px;
`;