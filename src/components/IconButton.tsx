import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Styles } from '../constants';

export default function IconButton(props) {
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
        ...Styles.lightShadow,
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
