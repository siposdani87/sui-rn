import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet } from 'react-native';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';
import { Colors, Styles } from '../constants';
// import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function DatetimeField(props: { mode: any, value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, style?: any, containerStyle?: any }) {
  const [value, setValue] = useState(props.value);
  const [date, setDate] = useState(getDate(props.value));
  const [error, onErrorChange] = useBaseField(props);
  const hasError = error || (props.required && (!value || value && value.length === 0));
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  useEffect(() => {
    setValue(props.value);
    setDate(getDate(props.value));
  }, [props.value]);

  function onValueChange(_event, v) {
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
    setDate(getDate(v));
  }

  function getDate(v){
    return moment(v).toDate();
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
    <View style={[styles.container, props.containerStyle]}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      {/* <TextInput {...props} value={value} style={[styles.textInput, props.style, _getTextInputStyle(), _getTextInputErrorStyle()]} onChangeText={onValueChange} underlineColorAndroid='transparent' selectionColor={Colors.deepGreyBright} /> */}
      {/* <DateTimePicker value={date} mode={props.mode} is24Hour={true} display='default' onChange={onValueChange} />
       */}
       <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  textInput: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 16,
    height: 36,
    borderRadius: 3,
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