import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors, Styles } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function TextInputField(props) {
  // const {label, value, required, style} = props;
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const hasError = error || (props.required && (!value || value && value.length === 0));
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function _onChangeText(v) {
    onErrorChange();
    props.onChangeText(v);
    setValue(v);
  }

  function _getTextInputErrorStyle() {
    if (hasError) {
      if (props.disabled) {
        return isDarkTheme ? styles.hasErrorDisabledDark : styles.hasErrorDisabledLight;
      }
      return isDarkTheme ? styles.hasErrorDefaultDark : styles.hasErrorDefaultLight;
    }
    if (props.disabled) {
      return isDarkTheme ? styles.noErrorDisabledDark : styles.noErrorDisabledLight;
    }
    return isDarkTheme ? styles.noErrorDefaultDark : styles.noErrorDefaultLight;
  }

  function _getTextInputStyle() {
    if (props.disabled) {
      return isDarkTheme ? styles.disabledDarkTextInput : styles.disabledLightTextInput;
    }
    return isDarkTheme ? styles.defaultDarkTextInput : styles.defaultLightTextInput;
  }

  return (
    <View style={styles.baseContainer}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      <TextInput {...props} value={value} style={[props.style, styles.textInput, _getTextInputStyle(), _getTextInputErrorStyle()]} onChangeText={_onChangeText} underlineColorAndroid='transparent' selectionColor={Colors.deepGreyBright} />
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
  textInput: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 16,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  defaultLightTextInput: {
    color: Colors.contentDefaultLight,
  },
  defaultDarkTextInput: {
    color: Colors.contentDefaultDark,
  },
  disabledLightTextInput: {
    color: Colors.contentDisabledLight,
  },
  disabledDarkTextInput: {
    color: Colors.contentDisabledDark,
  },
  hasErrorDefaultLight: {
    borderColor: Colors.errorDefaultLight,
  },
  hasErrorDefaultDark: {
    borderColor: Colors.errorDefaultDark,
  },
  hasErrorDisabledLight: {
    borderColor: Colors.errorDisabledLight,
  },
  hasErrorDisabledDark: {
    borderColor: Colors.errorDisabledDark,
  },
  noErrorDefaultLight: {
    borderColor: Colors.inputDefaultLight,
  },
  noErrorDefaultDark: {
    borderColor: Colors.inputDefaultDark,
  },
  noErrorDisabledLight: {
    borderColor: Colors.inputDisabledLight,
  },
  noErrorDisabledDark: {
    borderColor: Colors.inputDisabledDark,
  },
});
