import React from 'react';
import SUI from 'sui-js';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Styles } from '../constants';

export default function Label(props) {
  return (
    <View style={[styles.labelContainer, props.style]}>
      <View style={styles.childrenContainer}>
        {props.children}
      </View>
      <Text style={styles.labelText} numberOfLines={1}>
        {props.label ? SUI.capitalize(props.label) : ''} {props.required ? '*' : ''}
      </Text>
    </View>
  );
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
    color: Colors.greyDark,
    fontWeight: '400',
  },
});
