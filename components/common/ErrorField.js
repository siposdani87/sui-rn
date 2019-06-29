import React from 'react';
import SUI from 'sui-js';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Styles } from '../../constants';

export default class ErrorField extends React.PureComponent {
  render() {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText} numberOfLines={1}>{this.props.error ? SUI.capitalize(this.props.error.join('; ')) : null}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    height: 12,
    marginTop: 5,
  },
  errorText: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 12,
    color: Colors.red,
    lineHeight: 14,
  },
});
