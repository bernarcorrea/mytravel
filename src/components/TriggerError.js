import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { theme, padding } from '../styles/globalStyles';

import Icon from 'react-native-vector-icons/AntDesign';

const TriggerError = styled.View`
    position: absolute;
    z-index: 2;
    flex-direction: row;
    align-items: center;
    right: 20px;
    top: ${Platform.OS === 'ios' ? "60px" : "30px"};
    width: 290px;
    padding: ${padding.paddingLow};
    border-radius: 20px;
    background-color: ${props => props.type == 'error' ? theme.primary : '#16c79a'};
`;

const TriggerText = styled.Text`
    font-size: 16px;
    color: ${theme.light};
    margin-left: 10px;
    margin-right: 10px;
`;

export default ({ type, description }) => {
    return (
        <TriggerError type={type}>
            <Icon name={type == 'error' ? 'warning' : 'checkcircleo'} size={30} color="#ffffff" />
            <TriggerText>{description}</TriggerText>
        </TriggerError>
    );
}