import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../constants';

export default function IconButton(props: { onPress: () => void, iconColor?: string, color?: string, borderColor?: string, source?: any, iconName?: string, iconType?: string, iconSize?: number, containerStyle?: any, style?: any }) {
    const backgroundColor = props.color || Colors.primary;
    const borderColor = props.borderColor || backgroundColor;
    const color = props.iconColor || Colors.primaryText;
    const iconSize = props.iconSize || 26;

    return (
        <TouchableOpacity style={[styles.container, props.containerStyle]} activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <View style={[styles.button, { backgroundColor, borderColor }, backgroundColor !== 'transparent' ? Styles.lightShadow : null, props.style]}>
                {!!props.source && (
                    <Image style={[styles.image, { width: iconSize, height: iconSize }]} source={props.source} />
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
    container: {},
    button: {
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        margin: 5,
        padding: 8,
    },
    image: {
        resizeMode: 'contain',
    },
    icon: {},
});
