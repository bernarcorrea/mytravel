import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from './pages/Preload';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import User from './pages/User';
import Password from './pages/Password';
import Service from './pages/Service';
import Search from './pages/Search';
import MainTab from './components/MainTab';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Service" component={Service} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
)