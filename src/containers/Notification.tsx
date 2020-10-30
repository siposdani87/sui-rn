import React from 'react';
import SUI from 'sui-js';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors, Layout, Styles } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Notification(props: { factories: any }) {
    const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;
    const insets = useSafeAreaInsets();

    function close(notification) {
        return () => {
            props.factories.notificationFactory.close(notification);
        }
    }

    function closable(notification) {
        return props.factories.notificationFactory.isClosable(notification.type, notification.opt_closeCallback) && !SUI.eq(notification.opt_duration, Infinity);
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
        return [styles.notificationText, isDarkTheme ? styles.notificationDarkText : styles.notificationLightText];
    }

    return (
        <View style={[styles.container, { top: insets.top + 20 }]}>
            {props.factories.notificationFactory.notifications.map((notification, index) => (
                <TouchableOpacity activeOpacity={Styles.activeOpacity} key={index} onPress={close(notification)}>
                    <View style={getContainerStyle(notification)}>
                        <Text style={getTextStyle()}>{notification.message}</Text>
                        {closable(notification) && (
                            <TouchableOpacity style={styles.notificationClose} activeOpacity={Styles.activeOpacity} onPress={close(notification)}>
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
    container: {
        position: 'absolute',
        zIndex: 3,
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
    notificationText: {
        fontFamily: Styles.fontFamilyBody,
        fontWeight: '400',
    },
    notificationLightText: {
        color: Colors.black,
    },
    notificationDarkText: {
        color: Colors.white,
    },
    notificationClose: {
        position: 'absolute',
        right: 2,
        top: 2,
        zIndex: 1,
    },
    successLightContainer: {
        borderTopColor: Colors.success,
    },
    successDarkContainer: {
        borderTopColor: Colors.successBright,
    },
    infoLightContainer: {
        borderTopColor: Colors.info,
    },
    infoDarkContainer: {
        borderTopColor: Colors.infoBright,
    },
    warningLightContainer: {
        borderTopColor: Colors.warning,
    },
    warningDarkContainer: {
        borderTopColor: Colors.warningBright,
    },
    errorLightContainer: {
        borderTopColor: Colors.error,
    },
    errorDarkContainer: {
        borderTopColor: Colors.errorBright,
    },
});
