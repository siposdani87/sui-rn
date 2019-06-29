import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../constants';

export default class BaseView extends React.PureComponent {
    render() {
        return (
            <KeyboardAvoidingView behavior= {(Platform.OS === 'ios')? "padding" : null} style={{ flex: 1, backgroundColor: Colors.white }}>
                {this.props.children}
            </KeyboardAvoidingView>
        );
    }
}

