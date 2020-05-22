import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../constants';

export default function IconButton(props: { onPress: () => void, textColor?: string, color?: string, borderColor?: string, title?: string, source?: any, iconName?: string, iconType?: string, style?: any }) {
    const backgroundColor = props.color || Colors.primary;
    return (
        <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <View style={[styles.buttonContainer, { backgroundColor, borderColor: props.borderColor || backgroundColor }, props.style]}>
                {props.source && (
                    <Image style={styles.image} source={props.source} />
                )}
                {props.iconName && !props.iconType && (
                    <MaterialIcons style={[styles.icon, { color: props.textColor || Colors.white }]} name={props.iconName} />
                )}
                {props.iconName && props.iconType === 'Community' && (
                    <MaterialCommunityIcons style={[styles.icon, { color: props.textColor || Colors.white }]} name={props.iconName} />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        margin: 5,
        padding: 8,
        ...Styles.lightShadow,
    },
    image: {
        width: 20,
        height: 20,
    },
    icon: {
        fontSize: 26,
    },
});
