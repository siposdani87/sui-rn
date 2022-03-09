import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';
import { StyleProp } from 'react-native';
import * as SUI from 'sui-js';

export default function ErrorField(props: {
    error?: any;
    disabled?: boolean;
}): JSX.Element | null {
    const isDarkTheme = useDarkTheme();

    const getTextStyle = (): StyleProp<TextStyle> => {
        if (props.disabled) {
            return isDarkTheme
                ? styles.errorDisabledDarkText
                : styles.errorDisabledLightText;
        }
        return isDarkTheme
            ? styles.errorDefaultDarkText
            : styles.errorDefaultLightText;
    };

    if (props.error === false) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.text, getTextStyle()]} numberOfLines={1}>
                {props.error ? SUI.capitalize(props.error.join('; ')) : null}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 3,
        height: 17,
    },
    text: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 12,
    },
    errorDefaultLightText: {
        color: Colors.errorDefaultLight,
    },
    errorDefaultDarkText: {
        color: Colors.errorDefaultDark,
    },
    errorDisabledLightText: {
        color: Colors.errorDisabledLight,
    },
    errorDisabledDarkText: {
        color: Colors.errorDisabledDark,
    },
});
