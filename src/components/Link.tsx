import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function Link(props: { title: string, onPress: () => void, color?: string, style?: any }) {
    const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;
    const colorStyle = props.color ? { color: props.color, textDecorationColor: props.color } : {};

    return (
        <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <Text style={[styles.linkText, isDarkTheme ? styles.linkDarkText : styles.linkLightText, colorStyle, props.style]} numberOfLines={2}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    linkText: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
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
