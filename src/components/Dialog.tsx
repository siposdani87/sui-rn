import React, { Fragment, useState } from 'react';
import { StyleSheet, View, Modal, ViewStyle } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';
import IconButton from './IconButton';
import Text from './Text';


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
                                <Text style={styles.headerText}>{props.title}</Text>
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
                            <Fragment key={key}>{button}</Fragment>
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
    success: {
        borderTopWidth: 5,
        borderTopColor: Colors.success,
    },
    info: {
        borderTopWidth: 5,
        borderTopColor: Colors.info,
    },
    warning: {
        borderTopWidth: 5,
        borderTopColor: Colors.warning,
    },
    error: {
        borderTopWidth: 5,
        borderTopColor: Colors.error,
    },
    choice: {
        borderTopWidth: 5,
        borderTopColor: Colors.accent,
    },
    dialogLightContainer: {
        backgroundColor: Colors.white,
    },
    dialogDarkContainer: {
        backgroundColor: Colors.black,
    },
    headerContainer: {
        padding: 10,
        minHeight: 40,
    },
    headerText: {
        fontFamily: Styles.fontFamilyHeading,
        fontWeight: '400',
        fontSize: 20,
    },
    bodyContainer: {
        padding: 15,
        marginBottom: 10,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    closeButton: {
        position: 'absolute',
        top: -5,
        right: -5,
        zIndex: 1,
    },
});
