import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';

export default function Link(props) {
    return (
        <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
            <Text style={[styles.linkText, { color: props.color }, props.style]} numberOfLines={2}>{props.children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    linkText: {
        color: Colors.primary,
        fontSize: 14,
        textDecorationColor: Colors.primary,
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
    },
});
