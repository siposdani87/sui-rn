import React from 'react';
import { View, StyleSheet, AlertButton } from 'react-native';
import { Dialog, TextButton, Text } from '../components';
import { Colors } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { ConfirmService } from '../services';

export function Confirm(props: { confirmService: ConfirmService }) {
    const type = props.confirmService.getType();
    const title = props.confirmService.getTitle();
    const message = props.confirmService.getMessage();
    const alertButtons = props.confirmService.getButtons();

    const close = (): void => {
        props.confirmService.close();
    };

    const onPress = (alertButton: AlertButton) => {
        return (value?: string) => {
            if (alertButton.onPress) {
                alertButton.onPress(value);
            }
            close();
        };
    };

    const getOnClose = () => {
        if (alertButtons.length === 0) {
            return close;
        }
        return undefined;
    };

    const getButtons = (): JSX.Element[] => {
        return alertButtons.map((alertButton) => {
            const buttonText = alertButton.text ?? '';
            switch (alertButton.style) {
                case 'default':
                    return (
                        <TextButton
                            title={buttonText}
                            onPress={onPress(alertButton)}
                            textColor={Colors.primary}
                        />
                    );
                case 'destructive':
                    return (
                        <TextButton
                            title={buttonText}
                            onPress={onPress(alertButton)}
                            textColor={Colors.error}
                        />
                    );
                case 'cancel':
                default:
                    return (
                        <TextButton
                            title={buttonText}
                            onPress={onPress(alertButton)}
                        />
                    );
            }
        });
    };

    const getIcon = (): JSX.Element | null => {
        const iconSize = 26;
        switch (type) {
            case 'success':
                return (
                    <MaterialIcons
                        name="done"
                        size={iconSize}
                        color={Colors.success}
                        style={styles.icon}
                    />
                );
            case 'info':
                return (
                    <MaterialIcons
                        name="info"
                        size={iconSize}
                        color={Colors.info}
                        style={styles.icon}
                    />
                );
            case 'warning':
                return (
                    <MaterialIcons
                        name="error"
                        size={iconSize}
                        color={Colors.warning}
                        style={styles.icon}
                    />
                );
            case 'error':
                return (
                    <MaterialIcons
                        name="dangerous"
                        size={iconSize}
                        color={Colors.error}
                        style={styles.icon}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Dialog
            type={type}
            title={title}
            visible={props.confirmService.isVisible()}
            buttons={getButtons()}
            onClose={getOnClose()}
        >
            <View style={styles.container}>
                {getIcon()}
                <Text style={styles.text}>{message}</Text>
            </View>
        </Dialog>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 5,
    },
    text: {
        flex: 1,
    },
});
