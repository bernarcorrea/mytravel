import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTab';

const Tab = createBottomTabNavigator();

import Main from '../pages/Main';
import Favorites from '../pages/Favorites';
import Appointments from '../pages/Appointments';
import Categories from '../pages/Categories';
import Category from '../pages/Category';

export default () => (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="Main" component={Main}></Tab.Screen>
        <Tab.Screen name="Categories" component={Categories}></Tab.Screen>
        <Tab.Screen name="Favorites" component={Favorites}></Tab.Screen>
        <Tab.Screen name="Appointments" component={Appointments}></Tab.Screen>
        <Tab.Screen name="Category" component={Category}></Tab.Screen>
    </Tab.Navigator>
)