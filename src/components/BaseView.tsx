import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Colors } from '../constants';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';

export default function BaseView(props: { barStyle?: StatusBarStyle, backgroundColor?: any, children: any }) {
    const backgroundColor = props.backgroundColor || 'transparent';
    const translucent = backgroundColor === 'transparent';
    return (
        <View style={[styles.areaView, { backgroundColor }]}>
            <StatusBar style={props.barStyle || 'light'} backgroundColor={backgroundColor} translucent={translucent} />
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : null} style={{ flex: 1, backgroundColor: Colors.white }}>
                {props.children}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
    },
});
