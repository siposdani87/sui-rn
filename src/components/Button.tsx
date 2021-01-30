import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../constants';

export default function Button(props: { onPress: () => void, iconColor?: string, textColor?: string, backgroundColor?: string, borderColor?: string, title?: string, imageSource?: any, iconName?: any, iconType?: string, keepFormat?: boolean, containerStyle?: any, style?: any }) {
    const backgroundColor = props.backgroundColor || Colors.primary;
    const borderColor = props.borderColor || backgroundColor;
    const textColor = props.textColor || Colors.primaryText;
    const iconColor = props.iconColor || textColor;

    function hasIcon() {
        return !!props.imageSource || !!props.iconName;
    }

    function hasTitle() {
        return !!props.title;
    }

    return (
        <TouchableOpacity style={[styles.container, props.containerStyle]} activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <View style={[styles.button, { backgroundColor, borderColor }, backgroundColor !== 'transparent' ? Styles.lightShadow : null, props.style]}>
                {!!props.imageSource && (
                    <Image style={[styles.image, { marginLeft: hasTitle() ? 5 : null }]} source={props.imageSource} />
                )}
                {!!props.iconName && !props.iconType && (
                    <MaterialIcons style={[styles.icon, { marginLeft: hasTitle() ? 5 : null, color: iconColor }]} name={props.iconName} />
                )}
                {!!props.iconName && props.iconType === 'Community' && (
                    <MaterialCommunityIcons style={[styles.icon, { marginLeft: hasTitle() ? 5 : null, color: iconColor }]} name={props.iconName} />
                )}
                {hasTitle() && (
                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style={[styles.text, { color: textColor, paddingLeft: hasIcon() ? 0 : null }]}>{props.keepFormat ? props.title : props.title.toUpperCase()}</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        ...Styles.lightShadow,
    },
    text: {
        fontFamily: Styles.fontFamilyBodyMedium,
        fontWeight: '500',
        fontSize: 16,
        marginHorizontal: 10,
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
