import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function TextButton(props: { onPress: () => void, textColor?: string, title?: string, source?: any, iconName?: string, iconType?: string, style?: any}) {
    const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

    function _getTextColor() {
        const defaultColor = isDarkTheme ? Colors.white : Colors.black;
        return props.textColor || defaultColor;
    }

    return (
        <View style={props.style}>
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
                {props.source && (
                    <Image style={styles.image} source={props.source} />
                )}
                {props.iconName && !props.iconType && (
                    <MaterialIcons style={[styles.icon, { color: _getTextColor() }]} name={props.iconName} />
                )}
                {props.iconName && props.iconType === 'Community' && (
                    <MaterialCommunityIcons style={[styles.icon, { color: _getTextColor() }]} name={props.iconName} />
                )}
                {props.title && (
                    <Text style={[styles.text, { color: _getTextColor() }]}>{props.title.toUpperCase()}</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 15,
    },
    image: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    icon: {
        fontSize: 26,
        padding: 12,
    },
});
