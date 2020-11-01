import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';
import { Colors, Styles } from '../constants';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function Text(props: { children?: any } & TextProps) {
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  function getTextStyle() {
    return isDarkTheme ? styles.darkText : styles.lightText;
  }

  return (
    <RNText style={[styles.text, getTextStyle(), props.style]}>{props.children}</RNText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Styles.fontFamilyBody,
    fontWeight: '400',
    fontSize: 16,
  },
  lightText: {
    color: Colors.black,
  },
  darkText: {
    color: Colors.white,
  },
});
