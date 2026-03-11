import React, { useEffect, useState, ReactNode, Fragment } from 'react';
import {
    Modal,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
    useWindowDimensions,
} from 'react-native';
import { Colors, Styles, Tokens } from '../constants';
import { useDarkTheme } from '../hooks';
import { DialogHeader } from './DialogHeader';

export function Dialog(props: {
    visible: boolean;
    type?: string;
    title?: string;
    buttons?: ReactNode[];
    onClose?: () => void;
    children?: ReactNode;
}) {
    const [visible, setVisible] = useState<boolean>(false);
    const isDarkTheme = useDarkTheme();
    const { width: windowWidth } = useWindowDimensions();

    const onClose = (): void => {
        setVisible(false);
        if (props.onClose) {
            props.onClose();
        }
    };

    const getStyle = (type: string): StyleProp<ViewStyle> => {
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

    return (
        <Modal
            animationType="fade"
            transparent={true}
            statusBarTranslucent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View
                style={[
                    styles.dropContainer,
                    isDarkTheme
                        ? styles.dropContainerDark
                        : styles.dropContainerLight,
                ]}
            >
                <View
                    style={[
                        styles.dialogContainer,
                        {
                            minWidth: Math.min(
                                windowWidth - Tokens.dialogMargin * 2,
                                360,
                            ),
                        },
                        Styles.shadow,
                        props.type ? getStyle(props.type) : null,
                        isDarkTheme
                            ? styles.dialogDarkContainer
                            : styles.dialogLightContainer,
                    ]}
                >
                    <DialogHeader title={props.title} onClose={props.onClose} />
                    <View style={styles.bodyContainer}>{props.children}</View>
                    <View style={styles.footerContainer}>
                        {props.buttons?.map((button, index) => (
                            <Fragment key={index}>{button}</Fragment>
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
    },
    dropContainerLight: {
        backgroundColor: `rgba(0, 0, 0, ${Tokens.dialogScrimOpacity})`,
    },
    dropContainerDark: {
        backgroundColor: `rgba(0, 0, 0, ${Math.min(Tokens.dialogScrimOpacity + 0.15, 1)})`,
    },
    dialogContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        borderRadius: Tokens.dialogBorderRadius,
        margin: Tokens.dialogMargin,
        maxWidth: Tokens.dialogMaxWidth,
    },
    success: {
        borderTopWidth: Tokens.dialogStatusBorderWidth,
        borderTopColor: Colors.success,
    },
    info: {
        borderTopWidth: Tokens.dialogStatusBorderWidth,
        borderTopColor: Colors.info,
    },
    warning: {
        borderTopWidth: Tokens.dialogStatusBorderWidth,
        borderTopColor: Colors.warning,
    },
    error: {
        borderTopWidth: Tokens.dialogStatusBorderWidth,
        borderTopColor: Colors.error,
    },
    choice: {
        borderTopWidth: Tokens.dialogStatusBorderWidth,
        borderTopColor: Colors.deepGreyBright,
    },
    dialogLightContainer: {
        backgroundColor: Colors.white,
    },
    dialogDarkContainer: {
        backgroundColor: Colors.black,
    },
    bodyContainer: {
        padding: Tokens.dialogBodyPadding,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingBottom: Tokens.dialogMargin,
        paddingHorizontal: Tokens.dialogMargin,
    },
});
