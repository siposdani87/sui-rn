import React from 'react';
import SUI from 'sui-js';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';

export default function Label(props: { children?: any, label?: string, required?: boolean, disabled?: boolean, style?: any }) {
  const isDarkTheme = true; // = useColorScheme() === 'dark';

  function _getTextStyle() {
    if (props.disabled) {
      return isDarkTheme ? styles.labelDisabledDarkText : styles.labelDisabledLightText;
    }
    return isDarkTheme ? styles.labelDefaultDarkText : styles.labelDefaultLightText;
  }

  return (
    <View style={[styles.labelContainer, props.style]}>
      <View style={styles.childrenContainer}>
        {props.children}
      </View>
      <Text style={[styles.labelText, _getTextStyle()]} numberOfLines={1}>
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
    fontWeight: '400',
  },
  labelDefaultLightText: {
    color: Colors.labelDefaultLight,
  },
  labelDefaultDarkText: {
    color: Colors.labelDefaultDark,
  },
  labelDisabledLightText: {
    color: Colors.labelDisabledLight,
  },
  labelDisabledDarkText: {
    color: Colors.labelDisabledDark,
  }
});