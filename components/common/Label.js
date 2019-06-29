import React from 'react';
import SUI from 'sui-js';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Styles } from '../../constants';

export default class Label extends React.PureComponent {
  render() {
    return (
      <View style={[styles.labelContainer, this.props.style]}>
        <View style={styles.childrenContainer}>
          {this.props.children}
        </View>
        <Text style={styles.labelText} numberOfLines={1}>
          {this.props.label ? SUI.capitalize(this.props.label) : ''} {this.props.required ? '*' : ''}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  childrenContainer: {
  },
  labelText: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 16,
    color: Colors.black,
    fontWeight: '400',
  },
});
