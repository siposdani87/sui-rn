import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, TextButton, Text } from '../components';
import { Colors } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';

export default function Confirm(props: { factories: any }) {
    const type = props.factories.confirmFactory.getType();
    const title = props.factories.confirmFactory.getTitle();
    const message = props.factories.confirmFactory.getMessage();

    function close() {
        props.factories.confirmFactory.close();
    }

    function onPress(alertButton) {
        return (value?: string) => {
            if (!!alertButton.onPress) {
                alertButton.onPress(value);
            }
            close();
        };
    }

    function getButtons(): any[] {
        const alertButtons = props.factories.confirmFactory.getButtons();

        return alertButtons.map((alertButton) => {
            switch (alertButton.style) {
                case 'default':
                    return (<TextButton title={alertButton.text} onPress={onPress(alertButton)} textColor={Colors.primary} />);
                case 'cancel':
                    return (<TextButton title={alertButton.text} onPress={onPress(alertButton)} />);
                case 'destructive':
                    return (<TextButton title={alertButton.text} onPress={onPress(alertButton)} textColor={Colors.error} />);
                default:
                    return (<TextButton title={alertButton.text} onPress={onPress(alertButton)} />);
            }
        });
    }

    function getIcon(): any {
        const iconSize = 26;
        switch (type) {
            case 'success':
                return (<MaterialIcons name='done' size={iconSize} color={Colors.success} style={styles.icon} />);
            case 'info':
                return (<MaterialIcons name='info' size={iconSize} color={Colors.info} style={styles.icon} />);
            case 'warning':
                return (<MaterialIcons name='warning' size={iconSize} color={Colors.warning} style={styles.icon} />);
            case 'error':
                return (<MaterialIcons name='error' size={iconSize} color={Colors.error} style={styles.icon} />);
            default:
                return null;
        }
    }

    return (
        <Dialog type={type} title={title} visible={props.factories.confirmFactory.isVisible()} buttons={getButtons()}>
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
    }
});
