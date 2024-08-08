import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import styled from 'styled-components/native';
import { theme } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/AntDesign';

const TabArea = styled.View`
    background-color: #ffffff;
    height: 75px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
`;

const TabItem = styled.TouchableOpacity`
    flex-direction: row;
    min-width: 40px;
    padding: 10px 17px;
    align-items: center;
    border-radius: 30px;
    background-color: ${props => props.background};
`;

const TabItemText = styled.Text`
    font-size: 13px;
    font-weight: bold;
    margin-left: 7px;
    color: ${theme.primary};
`;

export default ({ state, navigation }) => {
    const { state: user } = useContext(UserContext);

    const goPage = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem background={state.index === 0 ? "rgba(255,70,70,0.2)" : "rgba(0,0,0,0)"} onPress={() => goPage('Main')}>
                <Icon name="home" size={20} color={state.index === 0 ? theme.primary : theme.dark} />
                {state.index === 0 && <TabItemText>Home</TabItemText>}
            </TabItem>
            <TabItem background={state.index === 1 ? "rgba(255,70,70,0.2)" : "rgba(0,0,0,0)"} onPress={() => goPage('Categories')}>
                <Icon name="isv" size={20} color={state.index === 1 ? theme.primary : theme.dark} />
                {state.index === 1 && <TabItemText>Categorias</TabItemText>}
            </TabItem>
            <TabItem background={state.index === 2 ? "rgba(255,70,70,0.2)" : "rgba(0,0,0,0)"} onPress={() => goPage('Favorites')}>
                <Icon name="hearto" size={20} color={state.index === 2 ? theme.primary : theme.dark} />
                {state.index === 2 && <TabItemText>Favoritos</TabItemText>}
            </TabItem>
            <TabItem background={state.index === 3 ? "rgba(255,70,70,0.2)" : "rgba(0,0,0,0)"} onPress={() => goPage('Appointments')}>
                <Icon name="staro" size={20} color={state.index === 3 ? theme.primary : theme.dark} />
                {state.index === 3 && <TabItemText>Reservas</TabItemText>}
            </TabItem>
        </TabArea>
    );
}