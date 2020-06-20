import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../constants';

export default function Button(props: { onPress: () => void, textColor?: string, color?: string, borderColor?: string, title?: string, source?: any, iconName?: string, iconType?: string, style?: any }) {
    const backgroundColor = props.color || Colors.primary;
    return (
        <View style={props.style}>
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
                <View style={[styles.buttonContainer, { backgroundColor, borderColor: props.borderColor || backgroundColor }]}>
                    {props.source && (
                        <Image style={styles.image} source={props.source} />
                    )}
                    {props.iconName && !props.iconType && (
                        <MaterialIcons style={[styles.icon, { color: props.textColor || Colors.white }]} name={props.iconName} />
                    )}
                    {props.iconName && props.iconType === 'Community' && (
                        <MaterialCommunityIcons style={[styles.icon, { color: props.textColor || Colors.white }]} name={props.iconName} />
                    )}
                    {props.title && (
                        <Text style={[styles.text, { color: props.textColor || Colors.white }]}>{props.title.toUpperCase()}</Text>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
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
        fontSize: 16,
        textAlign: 'center',
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
