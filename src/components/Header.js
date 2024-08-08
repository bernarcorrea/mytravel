import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { theme, padding } from '../styles/globalStyles';

import Icon from 'react-native-vector-icons/AntDesign';

const Header = styled.View`
    flex-direction: row;
    align-items: center;
    padding: ${padding.paddingDefault};
    margin-top: 15px;
`;

const ButtonBack = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    background-color: ${theme.primary};
    border-radius: 25px;
    justify-content: center;
    align-items: center;
`;

const HeaderTitleLight = styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin-left: 20px;
    color: ${theme.light};
`;

const HeaderTitleDark = styled.Text`
    font-size: 25px;
    font-weight: bold;
    margin-left: 20px;
    color: ${theme.dark};
`;

export default ({ title = null, light = null}) => {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    }

    return (
        <Header>
            <ButtonBack onPress={handleBack}>
                <Icon name="arrowleft" size={25} color="#ffffff" />
            </ButtonBack>
            {title != null && light != null &&
                <HeaderTitleLight>{title}</HeaderTitleLight>
            }
            {title != null && light == null &&
                <HeaderTitleDark>{title}</HeaderTitleDark>
            }
        </Header >
    );
}