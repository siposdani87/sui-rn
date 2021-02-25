import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';

export default function TextButton(props: { onPress: () => void, textColor?: string, textSize?: number, backgroundColor?: string, borderColor?: string, title: string, keepFormat?: boolean, containerStyle?: any, style?: any }) {
    const isDarkTheme = useDarkTheme();
    const defaultColor = isDarkTheme ? Colors.white : Colors.black;
    const backgroundColor = props.backgroundColor || 'transparent';
    const borderColor = props.borderColor || backgroundColor;
    const textColor = props.textColor || defaultColor;
    const textSize = props.textSize || 16;

    function getTitle(): string {
        return props.keepFormat ? props.title : props.title.toUpperCase()
    }

    return (
        <TouchableOpacity style={[styles.container, props.containerStyle]} activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <View style={[styles.button, { backgroundColor, borderColor }, backgroundColor !== 'transparent' ? Styles.lightShadow : null, props.style]}>
                <Text numberOfLines={1} adjustsFontSizeToFit={true} style={[styles.text, { color: textColor, fontSize: textSize }]}>{getTitle()}</Text>
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
        fontFamily: Styles.fontFamilyBodyMedium,
        fontWeight: '500',
        fontSize: 16,
        paddingHorizontal: 10,
    },
});
