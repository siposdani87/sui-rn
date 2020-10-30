import React from 'react';
import { Text, useColorScheme, StyleSheet } from 'react-native';
import { Dialog, TextButton } from '../components';
import environment from '../config/environment';
import { Styles, Colors } from '../constants';

export default function Confirm(props: { factories: any }) {
    const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

    const title = props.factories.confirmfactory.getTitle();
    const message = props.factories.confirmfactory.getMessage();
    const hasMessage = props.factories.confirmfactory.hasMessage();

    function onClose() {
        props.factories.confirmfactory.onClose();
    }

    function onPress(alertButton) {
        return (value?: string) => {
            alertButton.onPress(value);
            onClose();
        };
    }

    function getButtons(): any[] {
        const alertButtons = props.factories.confirmfactory.getButtons();

        return alertButtons.map((alertButton) => {
            switch (alertButton.style) {
                case 'default':
                    return (<TextButton title={alertButton.text} onPress={onPress(alertButton)} textColor={Colors.primary} />);
                case 'cancel':
                    return (<TextButton title={alertButton.text} onPress={onPress(alertButton)} />);
                case 'destructive':
                    return (<TextButton title={alertButton.text} onPress={onPress(alertButton)} textColor={Colors.red} />);
                default:
                    return (<TextButton title={alertButton.text} onPress={onPress(alertButton)} />);
            }
        });
    }

    return (
        <Dialog title={title} visible={props.factories.confirmfactory.isVisible()} buttons={getButtons()}>
            {hasMessage && (
                <Text style={[styles.text, isDarkTheme ? styles.darkText : styles.lightText]}>{message}</Text>
            )}
        </Dialog>
    );
}
const styles = StyleSheet.create({
    text: {
        fontFamily: Styles.fontFamilyBody,
        fontWeight: '400',
        fontSize: 16,
    },
    lightText: {
        color: Colors.black,
    },
    darkText: {
        color: Colors.white,
    },
});