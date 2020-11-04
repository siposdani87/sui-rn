import React from 'react';
import SUI from 'sui-js';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Label(props: { text?: string, onPress?: () => void, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any, children?: any }) {
  const isDarkTheme = useDarkTheme();

  function getTextStyle() {
    if (props.disabled) {
      return isDarkTheme ? styles.labelDisabledDarkText : styles.labelDisabledLightText;
    }
    return isDarkTheme ? styles.labelDefaultDarkText : styles.labelDefaultLightText;
  }

  if (!props.text && !props.children) {
    return null;
  }
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.children}
      <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={props.onPress}>
        <Text style={[styles.text, props.style, getTextStyle()]} numberOfLines={2}>
          {props.text ? SUI.capitalize(props.text) : ''} {props.required ? '*' : ''}
        </Text>
      </TouchableOpacity>
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
