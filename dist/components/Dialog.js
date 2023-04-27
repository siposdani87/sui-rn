import React, { useEffect, useState, Fragment } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Colors, Styles } from '../constants';
import { useDarkTheme } from '../hooks';
import { DialogHeader } from './DialogHeader';
export function Dialog(props) {
    const [visible, setVisible] = useState(false);
    const isDarkTheme = useDarkTheme();
    const onClose = () => {
        setVisible(false);
        if (props.onClose) {
            props.onClose();
        }
    };
    const getStyle = (type) => {
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
    };
    useEffect(() => {
        if (props.visible !== visible) {
            setVisible(props.visible);
        }
    }, [props.visible, visible]);
    return (<Modal animationType="fade" transparent={true} statusBarTranslucent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.dropContainer}>
                <View style={[
            styles.dialogContainer,
            Styles.shadow,
            props.type ? getStyle(props.type) : null,
            isDarkTheme
                ? styles.dialogDarkContainer
                : styles.dialogLightContainer,
        ]}>
                    <DialogHeader title={props.title} onClose={props.onClose}/>
                    <View style={styles.bodyContainer}>{props.children}</View>
                    <View style={styles.footerContainer}>
                        {props.buttons &&
            props.buttons.map((button, key) => (<Fragment key={key}>{button}</Fragment>))}
                    </View>
                </View>
            </View>
        </Modal>);
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
        maxWidth: 520,
        minWidth: 360,
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
        borderTopColor: Colors.deepGreyBright,
    },
    dialogLightContainer: {
        backgroundColor: Colors.white,
    },
    dialogDarkContainer: {
        backgroundColor: Colors.black,
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
});
//# sourceMappingURL=Dialog.js.map