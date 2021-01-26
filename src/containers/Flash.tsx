import React from 'react';
import SUI from 'sui-js';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors, Layout, Styles } from '../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton, Text } from '../components';
import useDarkTheme from '../hooks/useDarkTheme';

export default function Flash(props: { services: any }) {
    const isDarkTheme = useDarkTheme();
    const insets = useSafeAreaInsets();

    function close(flash) {
        return () => {
            props.services.flashService.close(flash);
        }
    }

    function closable(flash) {
        return props.services.flashService.isClosable(flash.type, flash.opt_closeCallback) && !SUI.eq(flash.opt_duration, Infinity);
    }

    function getContainerStyle(flash) {
        const containerStyles: any[] = [styles.flashContainer, isDarkTheme ? styles.flashDarkContainer : styles.flashLightContainer];
        switch (flash.type.toLowerCase()) {
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

    return (
        <View style={[styles.container, { top: insets.top + 20 }]}>
            {props.services.flashService.flashes.map((flash, index) => (
                <TouchableOpacity activeOpacity={Styles.activeOpacity} key={index} onPress={close(flash)}>
                    <View style={getContainerStyle(flash)}>
                        <Text style={styles.flashText}>{flash.message}</Text>
                        {closable(flash) && (
                            <IconButton containerStyle={styles.flashClose} iconName='close' iconSize={18} onPress={close(flash)} />
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
    flashContainer: {
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
    flashLightContainer: {
        backgroundColor: Colors.lightGreyBright,
    },
    flashDarkContainer: {
        backgroundColor: Colors.black,
    },
    flashText: {
        fontFamily: Styles.fontFamilyBody,
        fontWeight: '400',
        fontSize: 14,
    },
    flashClose: {
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