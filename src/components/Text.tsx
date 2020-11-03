import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';

export default function Text(props: { children?: any } & TextProps) {
  const isDarkTheme = useDarkTheme();

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
