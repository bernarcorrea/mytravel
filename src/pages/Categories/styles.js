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

export const CategoryArea = styled.View``;

export const CategorySubtitleText = styled.Text`
    font-size: 17px;
    color: ${theme.dark};
    margin-bottom: 20px;
`;

export const CategoryItem = styled.TouchableOpacity`
    margin-bottom: 15px;
    padding: ${padding.paddingLow};
    background-color: ${theme.light};
    flex-direction: row;
    align-items: center;
    border-radius: 50px;
`;

export const CategoryItemImage = styled.Image`
    margin-right: 15px;
    width: 50px;
    height: 50px;
`;

export const CategoryItemText = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: ${theme.dark};
`;
