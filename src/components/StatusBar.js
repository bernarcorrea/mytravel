import React from 'react';
import {
    StatusBar,
    View,
    SafeAreaView,
    Dimensions,
    Platform
} from 'react-native';
import { theme } from '../styles/globalStyles';

const iPhone8Width = 375;
const iPhone8Height = 667;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

const isNewiPhone = false;
if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    const isNewiPhone = W_WIDTH > iPhone8Width && W_HEIGHT > iPhone8Height;
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default ({ backgroundColor, ...props }) => {
    if (isNewiPhone) {
        return (
            <View style={{
                height: STATUSBAR_HEIGHT,
                backgroundColor: backgroundColor
            }}>
                <StatusBar
                    translucent
                    backgroundColor={backgroundColor}
                    {...props}
                />
            </View>
        );
    } else {
        return (
            <SafeAreaView style={{ backgroundColor: backgroundColor }}>
                <StatusBar
                    translucent
                    backgroundColor={backgroundColor}
                    {...props}
                />
            </SafeAreaView>
        );
    }
}