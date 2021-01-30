import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';

export default function Link(props: { title: string, onPress: () => void, color?: string, containerStyle?: any }) {
    const isDarkTheme = useDarkTheme();
    const colorStyle = props.color ? { color: props.color, textDecorationColor: props.color } : null;

    return (
        <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress} style={props.containerStyle}>
            <Text style={[styles.text, isDarkTheme ? styles.darkText : styles.lightText, colorStyle]}>{props.title}</Text>
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
    lightText: {
        color: Colors.primary,
        textDecorationColor: Colors.primary,
    },
    darkText: {
        color: Colors.primaryBright,
        textDecorationColor: Colors.primaryBright,
    },
});
