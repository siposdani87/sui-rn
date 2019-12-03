import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../constants';

export default function BaseView(props) {
    return (
        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? 'padding' : null} style={{ flex: 1, backgroundColor: Colors.white }}>
            {props.children}
        </KeyboardAvoidingView>
    );
}
