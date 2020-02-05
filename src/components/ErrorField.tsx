import React from 'react';
import SUI from 'sui-js';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function ErrorField(props: { error?: any, disabled?: boolean }) {
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  function _getTextStyle() {
    if (props.disabled) {
      return isDarkTheme ? styles.errorDisabledDarkText : styles.errorDisabledLightText;
    }
    return isDarkTheme ? styles.errorDefaultDarkText : styles.errorDefaultLightText;
  }

  return (
    <View style={styles.errorContainer}>
      <Text style={[styles.errorText, _getTextStyle()]} numberOfLines={1}>{props.error ? SUI.capitalize(props.error.join('; ')) : null}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    height: 12,
    marginTop: 5,
  },
  errorText: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 12,
    lineHeight: 14,
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
  }
});
