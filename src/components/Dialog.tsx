import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, ViewStyle } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';
import IconButton from './IconButton';

export default function Dialog(props: { visible: boolean, type?: string; title?: string, buttons?: any, onClose?: () => void, children?: any }) {
    const [visible, setVisible] = useState(false);
    const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

    if (props.visible !== visible) {
        setVisible(props.visible);
    }

    function onClose() {
        setVisible(false);
        if (props.onClose) {
            props.onClose();
        }
    }

    return (
        <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.dropContainer}>
                <View style={[styles.dialogContainer, props.type ? styles[props.type] : null, isDarkTheme ? styles.dialogDarkContainer : styles.dialogLightContainer]}>
                    {(!!props.title || !!props.onClose) && (
                        <View style={styles.headerContainer}>
                            {!!props.title && (
                                <Text style={[styles.headerText, isDarkTheme ? styles.headerDarkText : styles.headerLightText]}>{props.title}</Text>
                            )}
                            {!!props.onClose && (
                                <IconButton iconName='close' onPress={onClose} containerStyle={styles.closeButton} />
                            )}
                        </View>
                    )}
                    <View style={styles.bodyContainer}>
                        {props.children}
                    </View>
                    <View style={styles.footerContainer}>
                        {props.buttons && props.buttons.map((button, key) => (
                            <View key={key} style={styles.button}>{button}</View>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    dropContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    dialogContainer: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        borderRadius: 3,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 10,
        ...Styles.shadow as ViewStyle,
    },
    info: {
        borderTopWidth: 3,
        borderTopColor: Colors.info,
    },
    warning: {
        borderTopWidth: 3,
        borderTopColor: Colors.warning,
    },
    dialogLightContainer: {
        backgroundColor: Colors.white,
    },
    dialogDarkContainer: {
        backgroundColor: Colors.black,
    },
    headerContainer: {
        marginBottom: 20,
    },
    headerText: {
        fontFamily: Styles.fontFamilyHeading,
        fontWeight: '400',
        fontSize: 22,
    },
    headerLightText: {
        color: Colors.black,
    },
    headerDarkText: {
        color: Colors.white,
    },
    bodyContainer: {
        marginBottom: 20,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        marginLeft: 10,
    },
    closeButton: {
        position: 'absolute',
        top: -15,
        right: -15,
        zIndex: 1,
    },
});
