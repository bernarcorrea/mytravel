import React from 'react';
import styled from 'styled-components/native';
import { theme } from '../styles/globalStyles';

const Mask = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${theme.mask};
    z-index: 1;
    justify-content: center;
    align-items: center;
`;

const LoadingIcon = styled.ActivityIndicator``;

export default () => {
    return (
        <Mask>
            <LoadingIcon size="large" color="#ffffff" />
        </Mask>
    );
}