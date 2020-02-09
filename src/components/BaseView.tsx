import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Colors } from '../constants';

export default function BaseView(props) {
    return (
        <SafeAreaView style={styles.areaView}>
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : null} style={{ flex: 1, backgroundColor: Colors.white }}>
                {props.children}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
});
