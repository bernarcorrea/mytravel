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

export const ServicesArea = styled.View``;

export const Service = styled.TouchableOpacity`
    margin-bottom: 20px;
    border-radius: 20px;
`;
