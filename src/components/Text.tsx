import React from 'react';
import { Text as RNText, StyleSheet, TextProps } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';

export default function Text(props: { children?: any, muted?: boolean } & TextProps) {
  const isDarkTheme = useDarkTheme();

  function getTextStyle() {
    if (props.muted){
      return isDarkTheme ? styles.mutedDarkText : styles.mutedLightText;
    }
    return isDarkTheme ? styles.darkText : styles.lightText;
  }

  return (
    <RNText {...props} style={[styles.text, getTextStyle(), props.style]}>{props.children}</RNText>
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
  mutedLightText: {
    color: Colors.deepGreyBright,
  },
  mutedDarkText: {
    color: Colors.blackBright,
  },
});
