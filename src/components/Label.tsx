import React from 'react';
import SUI from 'sui-js';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function Label(props: { children?: any, label?: string, required?: boolean, disabled?: boolean, style?: any, containerStyle?: any }) {
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  function getTextStyle() {
    if (props.disabled) {
      return isDarkTheme ? styles.labelDisabledDarkText : styles.labelDisabledLightText;
    }
    return isDarkTheme ? styles.labelDefaultDarkText : styles.labelDefaultLightText;
  }

  if (!props.label && !props.children) {
    return null;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.children}
      <Text style={[styles.text, props.style, getTextStyle()]} numberOfLines={2}>
        {props.label ? SUI.capitalize(props.label) : ''} {props.required ? '*' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  text: {
    fontFamily: Styles.fontFamilyBody,
    fontWeight: '400',
    fontSize: 16,
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
  },
});
