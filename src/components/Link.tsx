import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function Link(props: { color?: string, style?: any, children: any, onPress: () => void }) {
    const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

    const colorStyle = props.color ? { color: props.color, textDecorationColor: props.color } : null;

    return (
        <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <Text style={[styles.linkText, isDarkTheme ? styles.linkDarkText : styles.linkLightText, props.style, colorStyle]} numberOfLines={2}>{props.children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    linkText: {
        fontSize: 16,
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
        fontFamily: Styles.fontFamilyBody,
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
