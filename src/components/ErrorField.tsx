import React from 'react';
import { View, Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { Colors, Styles } from '../constants';
import { useDarkTheme } from '../hooks';

const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

export type ErrorValueType = string[] | boolean | null;

export function ErrorField(props: {
    error?: ErrorValueType;
    disabled?: boolean;
}) {
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

    if ((props.error as boolean) === false) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, getTextStyle()]} numberOfLines={1}>
                {Array.isArray(props.error)
                    ? capitalize(props.error.join('; '))
                    : null}
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
