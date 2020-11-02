import React from 'react';
import SUI from 'sui-js';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function ErrorField(props: { error?: any, disabled?: boolean }) {
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  function getTextStyle() {
    if (props.disabled) {
      return isDarkTheme ? styles.errorDisabledDarkText : styles.errorDisabledLightText;
    }
    return isDarkTheme ? styles.errorDefaultDarkText : styles.errorDefaultLightText;
  }

  if (props.error === false){
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.text, getTextStyle()]} numberOfLines={1}>{props.error ? SUI.capitalize(props.error.join('; ')) : null}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
    height: 17,
  },
  text: {
    fontFamily: Styles.fontFamilyBody,
    fontWeight: '400',
    fontSize: 12,
  },
  errorDefaultLightText: {
    color: Colors.errorDefaultLight,
  },
  errorDefaultDarkText: {
    color: Colors.errorDefaultDark,
  },
  errorDisabledLightText: {
    color: Colors.errorDisabledLight,
  },
  errorDisabledDarkText: {
    color: Colors.errorDisabledDark,
  },
});
