import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../constants';

export default function Button(props: { onPress: () => void, textColor?: string, color?: string, borderColor?: string, title: string, source?: any, iconName?: string, iconType?: string, containerStyle?: any, style?: any, titleFormat?: boolean }) {
    const backgroundColor = props.color || Colors.primary;
    const borderColor = props.borderColor || backgroundColor;
    const color = props.textColor || Colors.primaryText;

    return (
        <TouchableOpacity style={[styles.container, props.containerStyle]} activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <View style={[styles.button, { backgroundColor, borderColor }, backgroundColor !== 'transparent' ? Styles.lightShadow : null, props.style]}>
                {props.source && (
                    <Image style={styles.image} source={props.source} />
                )}
                {props.iconName && !props.iconType && (
                    <MaterialIcons style={[styles.icon, { color }]} name={props.iconName} />
                )}
                {props.iconName && props.iconType === 'Community' && (
                    <MaterialCommunityIcons style={[styles.icon, { color }]} name={props.iconName} />
                )}
                {props.title && (
                    <Text style={[styles.text, { color }]}>{props.titleFormat ? props.title : props.title.toUpperCase()}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {},
    button: {
        minHeight: 36,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        minWidth: 36,
        margin: 5,
        paddingHorizontal: 15,
        ...Styles.lightShadow,
    },
    text: {
        fontFamily: Styles.fontFamilyBody,
        fontWeight: '400',
        fontSize: 16,
        textAlign: 'center',
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 10,
    },
    icon: {
        fontSize: 26,
        padding: 12,
    },
});
