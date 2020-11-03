import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';

export default function IconButton(props: { onPress: () => void, iconColor?: string, backgroundColor?: string, borderColor?: string, imageSource?: any, iconName?: string, iconType?: string, iconSize?: number, containerStyle?: any, style?: any }) {
    const isDarkTheme = useDarkTheme();
    const defaultColor = isDarkTheme ? Colors.white : Colors.black;
    const backgroundColor = props.backgroundColor || 'transparent';
    const borderColor = props.borderColor || backgroundColor;
    const color = props.iconColor || defaultColor;
    const iconSize = props.iconSize || 26;

    return (
        <TouchableOpacity style={[styles.container, props.containerStyle]} activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <View style={[styles.button, { backgroundColor, borderColor }, backgroundColor !== 'transparent' ? Styles.lightShadow : null, props.style]}>
                {!!props.imageSource && (
                    <Image style={[styles.image, { width: iconSize, height: iconSize }]} source={props.imageSource} />
                )}
                {!!props.iconName && !props.iconType && (
                    <MaterialIcons style={[styles.icon, { color, fontSize: iconSize }]} name={props.iconName} />
                )}
                {!!props.iconName && props.iconType === 'Community' && (
                    <MaterialCommunityIcons style={[styles.icon, { color, fontSize: iconSize }]} name={props.iconName} />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    button: {
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
    },
    image: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    icon: {
        fontSize: 26,
    },
});
