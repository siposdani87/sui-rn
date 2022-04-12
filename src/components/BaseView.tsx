import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';

export function BaseView(props: {
    barStyle?: StatusBarStyle;
    backgroundColor?: string;
    children: any;
}): JSX.Element {
    const backgroundColor = props.backgroundColor || 'transparent';
    const translucent = backgroundColor === 'transparent';

    return (
        <View style={[styles.areaView, { backgroundColor }]}>
            <StatusBar
                style={props.barStyle || 'light'}
                backgroundColor={backgroundColor}
                translucent={translucent}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.areaView}
            >
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
