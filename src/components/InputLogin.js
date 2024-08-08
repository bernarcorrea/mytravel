import React from 'react';
import styled from 'styled-components/native';
import { theme } from '../styles/globalStyles';

import IconInput from 'react-native-vector-icons/FontAwesome';

const InputLabel = styled.View`
    width: 100%;
    margin-bottom: 20px;
`;

const InputArea = styled.View`
    width: 100%;
    height: 45px;
    flex-direction: row;
    align-items: center;
    border-bottom-width: 2px;
    border-bottom-color: ${theme.dark};
`;

const Input = styled.TextInput`
    flex: 1;
	font-size: 16px;
	color: ${theme.dark};
	margin-right: 10px;
`;

const InputTitle = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: ${theme.dark};
`;

export default ({ Title, Icon, placeholder, value, onChangeText, password, keyboardType = null, autoCapitalize = null }) => {
    return (
        <InputLabel>
            <InputTitle>{Title}:</InputTitle>
            <InputArea>
                <Input
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={password}
                    keyboardType={keyboardType != null ? keyboardType : "default"}
                    autoCapitalize={autoCapitalize != null ? autoCapitalize : "sentences"}
                />
                <IconInput name={Icon} size={20} />
            </InputArea>
        </InputLabel>
    )
}