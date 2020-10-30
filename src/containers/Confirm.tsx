import React from 'react';
import { Text, useColorScheme, StyleSheet } from 'react-native';
import { Dialog, TextButton } from '../components';
import environment from '../config/environment';
import { Styles, Colors } from '../constants';

export default function Confirm(props: { factories: any }) {
    const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

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
            <Text style={[styles.text, isDarkTheme ? styles.darkText : styles.lightText]}>{message}</Text>
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