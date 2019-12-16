import React from 'react';
import SUI from 'sui-js';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors, Layout, Styles } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native-appearance';

export default function Notification(props) {
    const isDarkTheme = true; // = useColorScheme() === 'dark';

    function close(index) {
        return () => {
            props.screenProps.factories.notificationFactory.close(index);
        };
    }

    function closable(notification) {
        return props.screenProps.factories.notificationFactory.isClosable(notification.type, notification.opt_closeCallback) && !SUI.eq(notification.opt_duration, Infinity);
    }

    function getContainerStyle(notification) {
        const containerStyles: any[] = [styles.notificationContainer, isDarkTheme ? styles.notificationDarkContainer : styles.notificationLightContainer];
        switch (notification.type.toLowerCase()) {
            case 'success':
                containerStyles.push(styles.successContainer);
                break;
            case 'info':
                containerStyles.push(styles.infoContainer);
                break;
            case 'warning':
                containerStyles.push(styles.warningContainer);
                break;
            case 'error':
                containerStyles.push(styles.errorContainer);
                break;
        }
        return containerStyles;
    }

    function getTextStyle(notification) {
        const textStyles: any[] = [isDarkTheme ? styles.notificationDarkText : styles.notificationLightText];
        switch (notification.type.toLowerCase()) {
            case 'success':
                textStyles.push(styles.successText);
                break;
            case 'info':
                textStyles.push(styles.infoText);
                break;
            case 'warning':
                textStyles.push(styles.warningText);
                break;
            case 'error':
                textStyles.push(styles.errorText);
                break;
        }
        return textStyles;
    }

    return (
        <View style={styles.baseContainer}>
            {props.screenProps.factories.notificationFactory.notifications.map((notification, index) => (
                <TouchableOpacity activeOpacity={Styles.activeOpacity} key={index} onPress={close(index)}>
                    <View style={getContainerStyle(notification)}>
                        <Text style={getTextStyle(notification)}>{notification.message}</Text>
                        {closable(notification) && (
                            <TouchableOpacity style={styles.notificationClose} activeOpacity={Styles.activeOpacity} onPress={close(index)}>
                                <MaterialIcons name='close' size={18} color={Colors.black} />
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
        top: 40,
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
        ...Styles.shadow,
    },
    notificationLightContainer: {
        backgroundColor: Colors.lightGreyBright,
    },
    notificationDarkContainer: {
        backgroundColor: Colors.blackDark,
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
    },
    successContainer: {
        borderTopColor: Colors.green,
    },
    successText: {

    },
    infoContainer: {
        borderTopColor: Colors.blue,
    },
    infoText: {

    },
    warningContainer: {
        borderTopColor: Colors.amber,
    },
    warningText: {

    },
    errorContainer: {
        borderTopColor: Colors.red,
    },
    errorText: {

    },
});
