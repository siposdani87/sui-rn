import React, { useState } from 'react';
import TextButton from './TextButton';
import Button from './Button';
import { StyleSheet, View, Text, Modal, ViewStyle } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function Dialog(props: { title?: string, children?: any, text?: string, cancelText?: string, submitText?: string, buttons?: any, visible: boolean, onSubmit?: () => void, onCancel?: () => void, onClose?: () => void }) {
    const [visible, setVisible] = useState(false);
    const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

    if (props.visible !== visible) {
        setVisible(props.visible);
    }

    function onSubmit() {
        setVisible(false);
        if (props.onSubmit) {
            props.onSubmit();
        }
    }

    function onCancel() {
        setVisible(false);
        if (props.onCancel) {
            props.onCancel();
        }
    }

    function onClose() {
        setVisible(false);
        if (props.onClose) {
            props.onClose();
        }
    }

    return (
        <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onCancel}>
            <View style={styles.dropContainer}>
                <View style={[styles.dialogContainer, isDarkTheme ? styles.dialogDarkContainer : styles.dialogLightContainer]}>
                    {props.title && (
                        <View style={styles.headerContainer}>
                            <Text style={[styles.headerText, isDarkTheme ? styles.headerDarkText : styles.headerLightText]}>{props.title}</Text>
                            {props.onClose && (
                                <TextButton iconName='close' onPress={onClose} containerStyle={styles.closeButton} />
                            )}
                        </View>
                    )}
                    <View style={styles.bodyContainer}>
                        {props.children}
                        {props.text && (
                            <Text style={styles.bodyText}>{props.text}</Text>
                        )}
                    </View>
                    <View style={styles.footerContainer}>
                        {props.onCancel && (
                            <TextButton title={props.cancelText} onPress={onCancel} containerStyle={styles.button} />
                        )}
                        {props.onSubmit && (
                            <Button title={props.submitText} onPress={onSubmit} containerStyle={styles.button} />
                        )}
                        {props.buttons && props.buttons.map((button, key) => (
                            <View key={key}>{button}</View>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    dropContainer: {
        ...Styles.fullscreenContainer as ViewStyle,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    dialogContainer: {
        ...Styles.dialogContainer as ViewStyle,
        ...Styles.shadow as ViewStyle,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
    },
    dialogLightContainer: {
        backgroundColor: Colors.white,
    },
    dialogDarkContainer: {
        backgroundColor: Colors.black,
    },
    headerContainer: {
        marginTop: -5,
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
    bodyText: {
        fontFamily: Styles.fontFamilyBody,
        fontWeight: '400',
        color: Colors.black,
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
        top: -10,
        right: -15,
    },
});
