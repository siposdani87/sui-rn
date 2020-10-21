import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function TextButton(props: { onPress: () => void, textColor?: string, title: string, style?: any, containerStyle?: any }) {
    const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

    function _getTextColor() {
        const defaultColor = isDarkTheme ? Colors.white : Colors.black;
        return props.textColor || defaultColor;
    }

    return (
        <View style={props.containerStyle}>
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
                {props.title && (
                    <Text style={[styles.text, { color: _getTextColor() }]}>{props.title.toUpperCase()}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: Styles.fontFamilyBody,
        fontWeight: '400',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 15,
    },
});
