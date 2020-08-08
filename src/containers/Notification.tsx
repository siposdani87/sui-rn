import React from 'react';
import SUI from 'sui-js';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors, Layout, Styles } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';
import { useSafeArea } from 'react-native-safe-area-context';

export default function Notification(props) {
    const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;
    const insets = useSafeArea();

    function close(notification) {
        props.screenProps.factories.notificationFactory.close(notification);
    }

    function closable(notification) {
        return props.screenProps.factories.notificationFactory.isClosable(notification.type, notification.opt_closeCallback) && !SUI.eq(notification.opt_duration, Infinity);
    }

    function getContainerStyle(notification) {
        const containerStyles: any[] = [styles.notificationContainer, isDarkTheme ? styles.notificationDarkContainer : styles.notificationLightContainer];
        switch (notification.type.toLowerCase()) {
            case 'success':
                containerStyles.push(isDarkTheme ? styles.successDarkContainer : styles.successLightContainer);
                break;
            case 'info':
                containerStyles.push(isDarkTheme ? styles.infoDarkContainer : styles.infoLightContainer);
                break;
            case 'warning':
                containerStyles.push(isDarkTheme ? styles.warningDarkContainer : styles.warningLightContainer);
                break;
            case 'error':
                containerStyles.push(isDarkTheme ? styles.errorDarkContainer : styles.errorLightContainer);
                break;
        }
        return containerStyles;
    }

    function getTextStyle() {
        return [isDarkTheme ? styles.notificationDarkText : styles.notificationLightText];
    }

    return (
        <View style={[styles.baseContainer, { top: insets.top + 20 }]}>
            {props.screenProps.factories.notificationFactory.notifications.map((notification, index) => (
                <TouchableOpacity activeOpacity={Styles.activeOpacity} key={index} onPress={close.call(this, notification)}>
                    <View style={getContainerStyle(notification)}>
                        <Text style={getTextStyle()}>{notification.message}</Text>
                        {closable(notification) && (
                            <TouchableOpacity style={styles.notificationClose} activeOpacity={Styles.activeOpacity} onPress={close.call(this, notification)}>
                                <MaterialIcons name='close' size={18} color={isDarkTheme ? Colors.white : Colors.black} />
                            </TouchableOpacity>
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    baseContainer: {
        position: 'absolute',
        zIndex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: Layout.window.width,
    },
    notificationContainer: {
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 40,
        borderRadius: 3,
        borderStyle: 'solid',
        borderTopWidth: 5,
        borderTopColor: Colors.blackDark,
        ...Styles.shadow,
    },
    notificationLightContainer: {
        backgroundColor: Colors.lightGreyBright,
    },
    notificationDarkContainer: {
        backgroundColor: Colors.black,
    },
    notificationLightText: {
        color: Colors.black,
        fontFamily: Styles.fontFamilyBody,
    },
    notificationDarkText: {
        color: Colors.white,
        fontFamily: Styles.fontFamilyBody,
    },
    notificationClose: {
        position: 'absolute',
        right: 2,
        top: 2,
    },
    successLightContainer: {
        borderTopColor: Colors.green,
    },
    successDarkContainer: {
        borderTopColor: Colors.greenBright,
    },
    infoLightContainer: {
        borderTopColor: Colors.blue,
    },
    infoDarkContainer: {
        borderTopColor: Colors.blueBright,
    },
    warningLightContainer: {
        borderTopColor: Colors.amber,
    },
    warningDarkContainer: {
        borderTopColor: Colors.amberBright,
    },
    errorLightContainer: {
        borderTopColor: Colors.red,
    },
    errorDarkContainer: {
        borderTopColor: Colors.redBright,
    },
});
