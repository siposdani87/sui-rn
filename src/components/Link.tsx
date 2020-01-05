import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';

export default function Link(props: {color?: string, style?: any, children: any, onPress: () => void}) {
    const isDarkTheme = true; // = useColorScheme() === 'dark';

    const colorStyle = props.color ? { color: props.color, textDecorationColor: props.color } : null;

    return (
        <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <Text style={[styles.linkText, isDarkTheme ? styles.linkDarkText : styles.linkLightText, props.style, colorStyle]} numberOfLines={2}>{props.children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    linkText: {
        fontSize: 14,
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
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