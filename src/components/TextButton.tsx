import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function TextButton(props: { onPress: () => void, textColor?: string, title: string, containerStyle?: any, style?: any }) {
    const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;
    const defaultColor = isDarkTheme ? Colors.white : Colors.black;
    const color = props.textColor || defaultColor;

    return (
        <TouchableOpacity style={[styles.container, props.containerStyle]} activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <Text numberOfLines={1} adjustsFontSizeToFit={true} style={[styles.text, { color }, props.style]}>{props.title.toUpperCase()}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        minWidth: 36,
        margin: 5,
    },
    text: {
        fontFamily: Styles.fontFamilyBody,
        fontWeight: '500',
        fontSize: 16,
        paddingHorizontal: 15,
    },
});
