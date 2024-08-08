import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserContextProvider from './contexts/UserContext';
import Routes from './routes';

export default () => {
    return (
        <UserContextProvider>
            <NavigationContainer >
                <Routes />
            </NavigationContainer>
        </UserContextProvider>
    )
}