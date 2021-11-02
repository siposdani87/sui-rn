import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';

export default function Link(props: {
    title: string;
    onPress: () => void;
    color?: string;
    disabled?: boolean;
    containerStyle?: any;
}) {
    const isDarkTheme = useDarkTheme();
    const defaultColor = isDarkTheme ? Colors.primaryBright : Colors.primary;
    const color = props.color || defaultColor;
    const colorStyle = { color, textDecorationColor: color };

    function onPress() {
        if (!props.disabled && props.onPress) {
            props.onPress();
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={Styles.activeOpacity}
            onPress={onPress}
            style={props.containerStyle}
        >
            <Text style={[styles.text, colorStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    },
});
