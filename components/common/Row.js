import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class Row extends React.PureComponent {
    render() {
        return (
            <View style={[this.props.style, styles.row]}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        marginBottom: 10,
    },
});
