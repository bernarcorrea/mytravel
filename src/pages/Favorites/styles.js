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

export const LoadingIcon = styled.ActivityIndicator``;

export const FavoritesArea = styled.View``;

export const FavoritesSubtitle = styled.Text`
    font-size: 17px;
    color: ${theme.dark};
    margin-bottom: 20px;
`;

export const Service = styled.TouchableOpacity`
    position: relative;
    margin-bottom: 20px;
`;

export const ServiceButtonFav = styled.TouchableOpacity`
    position: absolute;
    z-index: 3;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: ${theme.light};
`;
