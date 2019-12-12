import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../constants';

export default function TextButton(props) {
    return (
        <View style={props.style}>
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
                {props.source && (
                    <Image style={styles.image} source={props.source} />
                )}
                {props.iconName && !props.iconType && (
                    <MaterialIcons style={[styles.icon, { color: props.textColor || Colors.black }]} name={props.iconName} />
                )}
                {props.iconName && props.iconType === 'Community' && (
                    <MaterialCommunityIcons style={[styles.icon, { color: props.textColor || Colors.black }]} name={props.iconName} />
                )}
                {props.title && (
                    <Text style={[styles.text, { color: props.textColor || Colors.black }]}>{props.title.toUpperCase()}</Text>
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
