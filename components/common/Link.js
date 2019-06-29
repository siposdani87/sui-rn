import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../../constants';

export default class Link extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={this.props.onPress}>
                <Text style={[styles.linkText, this.props.style]} numberOfLines={2}>{this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    linkText: {
        color: Colors.primary,
        fontSize: 14,
    },
});
