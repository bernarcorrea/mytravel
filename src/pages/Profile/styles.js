import React from 'react';
import styled from 'styled-components/native';

import { theme, padding } from '../../styles/globalStyles';

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.tertiary};
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const HeaderBody = styled.ImageBackground`
    position: relative;
`;

export const MaskHeader = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${theme.mask};
`;

export const PageBody = styled.View`
    padding: 0 ${padding.paddingDefault};
`;

export const ProfileImageArea = styled.View`
    justify-content: center;
    align-items: center;
`;

export const ProfileData = styled.View`
    margin-top: 10px;
    margin-bottom: 30px;
    justify-content: center;
    align-items: center;
`;

export const ProfileDataText = styled.Text`
    font-size: 13px;
    color: ${theme.light};
`;

export const ProfileDataTextBold = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${theme.light};
`;

export const ProfileOptions = styled.View`    
    margin-top: 20px;
`;

export const ProfileImage = styled.Image`
    width: 70px;
    height: 70px;
    align-items: center;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${theme.primary};
`;

export const ProfileItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: ${padding.paddingLow};
    border-radius: 10px;
    background-color: rgba(0,0,0,0.2);
    margin-bottom: 10px;
`;

export const ProfileText = styled.Text`
    font-size: 15px;
    margin: 0 10px;
    color: ${props => props.color || theme.light};
`;

export const SignatureArea = styled.View`
    position: absolute;
    width: 100%;
    bottom: 30px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const SignatureText = styled.Text`
    font-size: 12px;
    text-transform: uppercase;
    color: ${theme.light};
    margin: 0 6px;
`;

export const SignatureTextBold = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: ${theme.primary};
    text-transform: uppercase;
`;

