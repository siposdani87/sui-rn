import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, StatusBar, StatusBarStyle, View } from 'react-native';
import { Colors } from '../constants';

export default function BaseView(props: { barStyle?: StatusBarStyle, backgroundColor?: any, children: any }) {
    const backgroundColor = props.backgroundColor || 'transparent';
    const translucent = backgroundColor === 'transparent';
    return (
        <View style={[styles.areaView, { backgroundColor }]}>
            <StatusBar barStyle={props.barStyle || 'light-content'} backgroundColor={backgroundColor} translucent={translucent} />
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
