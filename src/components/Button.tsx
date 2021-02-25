import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../constants';

export default function Button(props: { onPress: () => void, iconColor?: string, textColor?: string, textSize?: number, backgroundColor?: string, borderColor?: string, title?: string, imageSource?: any, iconName?: any, iconSize?: number, iconType?: string, keepFormat?: boolean, layout?: string, containerStyle?: any, style?: any }) {
    const backgroundColor = props.backgroundColor || Colors.primary;
    const borderColor = props.borderColor || backgroundColor;
    const textColor = props.textColor || Colors.primaryText;
    const iconColor = props.iconColor || textColor;
    const textSize = props.textSize || 16;
    const iconSize = props.iconSize || 26;
    const layout = props.layout || 'left';

    function hasIcon() {
        return !!props.imageSource || !!props.iconName;
    }

    function hasTitle() {
        return !!props.title;
    }

    function getSpacing() {
        if (layout === 'left') {
            return { marginLeft: hasTitle() ? 5 : null };
        }
        return { marginRight: hasTitle() ? 5 : null };
    }

    function getTitle(): string {
        return props.keepFormat ? props.title : props.title.toUpperCase()
    }

    return (
        <TouchableOpacity style={[styles.container, props.containerStyle]} activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <View style={[styles.button, { backgroundColor, borderColor }, backgroundColor !== 'transparent' ? Styles.lightShadow : null, props.style]}>
                {layout === 'right' && hasTitle() && (
                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style={[styles.text, { paddingRight: hasIcon() ? 0 : null, color: textColor, fontSize: textSize }]}>{getTitle()}</Text>
                )}
                {!!props.imageSource && (
                    <Image style={[styles.image, getSpacing(), { width: iconSize, height: iconSize }]} source={props.imageSource} />
                )}
                {!!props.iconName && !props.iconType && (
                    <MaterialIcons style={[styles.icon, getSpacing(), { color: iconColor, fontSize: iconSize }]} name={props.iconName} />
                )}
                {!!props.iconName && props.iconType === 'Community' && (
                    <MaterialCommunityIcons style={[styles.icon, getSpacing(), { color: iconColor,  fontSize: iconSize }]} name={props.iconName} />
                )}
                {layout === 'left' && hasTitle() && (
                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style={[styles.text, { paddingLeft: hasIcon() ? 0 : null, color: textColor, fontSize: textSize }]}>{getTitle()}</Text>
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
        minHeight: 38,
        borderRadius: 19,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        justifyContent: 'center',
    },
    text: {
        fontFamily: Styles.fontFamilyBodyMedium,
        fontWeight: '500',
        fontSize: 16,
        marginHorizontal: 10,
        flexShrink: 1,
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
