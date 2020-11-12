import React from 'react';
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
        switch (type) {
            case 'success':
                return (<MaterialIcons name='done' size={24} color={Colors.success} />);
            case 'info':
                return (<MaterialIcons name='info' size={24} color={Colors.info} />);
            case 'warning':
                return (<MaterialIcons name='warning' size={24} color={Colors.warning} />);
            case 'error':
                return (<MaterialIcons name='error' size={24} color={Colors.error} />);
            default:
                return null;
        }
    }

    return (
        <Dialog type={type} title={title} visible={props.factories.confirmFactory.isVisible()} buttons={getButtons()}>
            {getIcon()}
            <Text style={{ marginBottom: 10 }}>{message}</Text>
        </Dialog>
    );
}
