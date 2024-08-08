import React from 'react';
import styled from 'styled-components/native';
import {theme, padding} from '../../styles/globalStyles';

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.silver};
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${padding.paddingDefault};
    margin-top: 10px;
`;

export const HeaderOptions = styled.View`
    flex-direction: row;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
`;

export const SearchIcon = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
    font-size: 35px;
    font-weight: bold;
    color: ${theme.dark};
`;

export const HeaderAvatar = styled.TouchableOpacity``;

export const AvatarImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-left: 15px;
    border-width: 3px;
    border-color: ${theme.primary};
`;

export const PageBody = styled.View``;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 20px;
`;

export const CategoryArea = styled.View`
    padding: ${padding.paddingDefault};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const CategoryItem = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
`;

export const CategoryImage = styled.Image`
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
`;

export const CategoryTitle = styled.Text`
    font-size: 12px;
    color: ${theme.dark};
`;

export const LastServiceArea = styled.View`
    margin-top: 10px;
    padding-left: ${padding.paddingDefault};
`;

export const ServiceTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

export const LastService = styled.ScrollView`
    margin-top: 20px;
    flex-direction: row;
`;

export const LastServiceItem = styled.TouchableOpacity`
    position: relative;
    width: 200px;
    height: 250px;
    border-radius: 20px;
    margin-right: 20px;
`;

export const LastServiceImage = styled.Image`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
`;

export const LastServiceMask = styled.View`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.mask};
    border-radius: 20px;
`;

export const LastServiceItemCate = styled.Text`
    position: absolute;
    z-index: 3;
    top: 20px;
    right: 20px;
    font-size: 12px;
    color: #ffffff;
    text-transform: uppercase;
    border-left-width: 3px;
    border-left-color: ${theme.primary};
    padding-left: 10px;
    line-height: 12px;
`;

export const LastServiceItemHeader = styled.View`
    width: 100%;
    padding: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
`;

export const LastServiceItemTitle = styled.Text`
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 7px;
`;

export const LastServiceItemTitlePoint = styled.View`
    background-color: ${theme.primary};
    width: 40px;
    height: 5px;
    border-radius: 10px;
`;

export const ContentProfileArea = styled.View`
    margin-top: 10px;
    padding: ${padding.paddingDefault};
`;

export const ProfileTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

export const ProfileArea = styled.View`
    margin-top: 20px;
    padding: ${padding.paddingDefault};
    border-radius: 20px;
    background-color: ${theme.tertiary};
`;

export const ProfileItem = styled.View`
    margin-bottom: 10px;
`;

export const ProfileText = styled.Text`
    font-size: 12px;
    color: ${theme.light};
`;

export const ProfileTextBold = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: ${theme.light};
`;

export const ButtonProfile = styled.TouchableOpacity`
    flex-direction: row;
    width: 150px;
    height: 40px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.primary};
    border-radius: 40px;
`;

export const ButtonProfileText = styled.Text`
    margin-left: 5px;
    color: ${theme.light};
    font-size: 14px;
    font-weight: bold;
`;
