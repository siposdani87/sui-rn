import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../constants';

export default function Button(props: { onPress: () => void, iconColor?: string, textColor?: string, backgroundColor?: string, borderColor?: string, title?: string, imageSource?: any, iconName?: string, iconType?: string, titleFormat?: boolean, containerStyle?: any, style?: any }) {
    const backgroundColor = props.backgroundColor || Colors.primary;
    const borderColor = props.borderColor || backgroundColor;
    const textColor = props.textColor || Colors.primaryText;
    const iconColor = props.iconColor || textColor;

    function hasIcon(){
        return !!props.imageSource || !!props.iconName;
    }

    return (
        <TouchableOpacity style={[styles.container, props.containerStyle]} activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <View style={[styles.button, { backgroundColor, borderColor }, backgroundColor !== 'transparent' ? Styles.lightShadow : null, props.style]}>
                {!!props.imageSource && (
                    <Image style={styles.image} source={props.imageSource} />
                )}
                {!!props.iconName && !props.iconType && (
                    <MaterialIcons style={[styles.icon, { color: iconColor }]} name={props.iconName} />
                )}
                {!!props.iconName && props.iconType === 'Community' && (
                    <MaterialCommunityIcons style={[styles.icon, { color: iconColor }]} name={props.iconName} />
                )}
                {!!props.title && (
                    <Text style={[styles.text, { color: textColor, paddingLeft: hasIcon()? 0 : null }]}>{props.titleFormat ? props.title : props.title.toUpperCase()}</Text>
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
        minHeight: 36,
        minWidth: 36,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        ...Styles.lightShadow,
    },
    text: {
        fontFamily: Styles.fontFamilyBody,
        fontWeight: '500',
        fontSize: 16,
        paddingHorizontal: 10,
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginHorizontal: 5,
    },
    icon: {
        fontSize: 26,
        marginHorizontal: 5,
    },
});
