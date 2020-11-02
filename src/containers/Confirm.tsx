import React from 'react';
import { Dialog, TextButton, Text } from '../components';
import { Colors } from '../constants';

export default function Confirm(props: { factories: any }) {
    const type = props.factories.confirmFactory.getType();
    const title = props.factories.confirmFactory.getTitle();
    const message = props.factories.confirmFactory.getMessage();

    function close() {
        props.factories.confirmFactory.close();
    }

    function onPress(alertButton) {
        return (value?: string) => {
            if (!!alertButton.onPress){
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

    return (
        <Dialog type={type} title={title} visible={props.factories.confirmFactory.isVisible()} buttons={getButtons()}>
            <Text style={{ marginBottom: 10 }}>{message}</Text>
        </Dialog>
    );
}
