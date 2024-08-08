import React from 'react';
import styled from 'styled-components/native';
import { theme } from '../../styles/globalStyles';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${theme.primary}
`;

export const TravelLogo = styled.Image`
    width: 150px;
    height: 150px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;