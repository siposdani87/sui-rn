import React, { Fragment, useState } from 'react';
import { StyleSheet, View, Modal, ViewStyle } from 'react-native';
import { Colors, Styles } from '../constants';
import IconButton from './IconButton';
import Text from './Text';
import useDarkTheme from '../hooks/useDarkTheme';


export default function Dialog(props: { visible: boolean, type?: string; title?: string, buttons?: any[], onClose?: () => void, children?: any }) {
    const [visible, setVisible] = useState(false);
    const isDarkTheme = useDarkTheme();

    if (props.visible !== visible) {
        setVisible(props.visible);
    }

    function onClose() {
        setVisible(false);
        if (props.onClose) {
            props.onClose();
        }
    }

    function getStyle(type) {
        switch (type) {
            case 'success':
                return styles.success;
            case 'info':
                return styles.info;
            case 'warning':
                return styles.warning;
            case 'error':
                return styles.error;
            case 'choice':
                return styles.choice;
            default:
                return null;
        }
    }

    return (
        <Modal animationType='fade' transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.dropContainer}>
                <View style={[styles.dialogContainer, props.type ? getStyle(props.type) : null, isDarkTheme ? styles.dialogDarkContainer : styles.dialogLightContainer]}>
                    <View style={[styles.headerContainer, props.onClose ? { paddingRight: 25 } : null]}>
                        {!!props.title && (
                            <Text style={styles.headerText}>{props.title}</Text>
                        )}
                    </View>
                    {!!props.onClose && (
                        <IconButton iconName='close' onPress={onClose} containerStyle={styles.closeButton} />
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    dialogContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        borderRadius: 3,
        margin: 20,
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
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 15,
        minHeight: 15,
    },
    headerText: {
        fontFamily: Styles.fontFamilyHeadingRegular,
        fontWeight: '400',
        fontSize: 22,
        textTransform: 'uppercase',
    },
    bodyContainer: {
        padding: 15,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
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
