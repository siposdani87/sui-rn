import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';

export default function TextButton(props: { onPress: () => void, textColor?: string, backgroundColor?: string, borderColor?: string, title: string, containerStyle?: any, style?: any }) {
    const isDarkTheme = useDarkTheme();
    const defaultColor = isDarkTheme ? Colors.white : Colors.black;
    const backgroundColor = props.backgroundColor || 'transparent';
    const borderColor = props.borderColor || backgroundColor;
    const color = props.textColor || defaultColor;

    return (
        <TouchableOpacity style={[styles.container, props.containerStyle]} activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <View style={[styles.button, { backgroundColor, borderColor }, backgroundColor !== 'transparent' ? Styles.lightShadow : null, props.style]}>
                <Text numberOfLines={1} adjustsFontSizeToFit={true} style={[styles.text, { color }, props.style]}>{props.title.toUpperCase()}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    button: {
        minHeight: 38,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
    },
    text: {
        fontFamily: Styles.fontFamilyBody,
        fontWeight: '500',
        fontSize: 16,
        paddingHorizontal: 10,
    },
});
