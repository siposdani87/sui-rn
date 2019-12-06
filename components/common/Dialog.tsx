import React, { useState } from 'react';
import TextButton from '../common/TextButton';
import Button from '../common/Button';
import { StyleSheet, View, Text, Modal, ViewStyle } from 'react-native';
import { Colors, Styles } from '../../constants';

export default function Dialog(props) {
    const [visible, setVisible] = useState(false);

    if (props.visible !== visible) {
        setVisible(props.visible);
    }

    function onSubmit() {
        _close();
        if (props.onSubmit) {
            props.onSubmit();
        }
    }

    function onCancel() {
        _close();
        if (props.onCancel) {
            props.onCancel();
        }
    }

    function onClose() {
        _close();
        if (props.onClose) {
            props.onClose();
        }
    }

    function _close() {
        setVisible(false);
    }

    return (
        <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onCancel}>
            <View style={styles.dropContainer}>
                <View style={styles.dialogContainer}>
                    {props.title && (
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerText}>{props.title}</Text>
                            {props.onClose && (
                                <TextButton iconName='close' onPress={onClose} style={styles.closeButton} />
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
                            <TextButton title={props.cancelText} textColor={Colors.black} onPress={onCancel} style={styles.button} />
                        )}
                        {props.onSubmit && (
                            <Button title={props.submitText} onPress={onSubmit} style={styles.button} />
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    dialogContainer: {
        ...Styles.dialogContainer as ViewStyle,
        ...Styles.shadow as ViewStyle,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
    },
    headerContainer: {
        marginTop: -5,
        marginBottom: 20,
    },
    headerText: {
        fontFamily: Styles.fontFamilyHeading,
        fontSize: 20,
    },
    bodyContainer: {
        marginBottom: 20,
    },
    bodyText: {
        fontFamily: Styles.fontFamilyBody,
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
        right: -10,
    },
});