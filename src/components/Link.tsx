import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';

export default function Link(props: { title: string, onPress: () => void, color?: string, style?: any }) {
    const isDarkTheme = useDarkTheme();
    const colorStyle = props.color ? { color: props.color, textDecorationColor: props.color } : null;

    return (
        <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <Text style={[styles.linkText, isDarkTheme ? styles.linkDarkText : styles.linkLightText, colorStyle, props.style]} numberOfLines={2}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    linkText: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        fontFamily: Styles.fontFamilyBody,
        fontWeight: '400',
        fontSize: 16,
    },
    linkLightText: {
        color: Colors.primary,
        textDecorationColor: Colors.primary,
    },
    linkDarkText: {
        color: Colors.primaryBright,
        textDecorationColor: Colors.primaryBright,
    },
});
