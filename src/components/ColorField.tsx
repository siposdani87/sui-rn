import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';
import { ColorPicker, toHsv } from 'react-native-color-picker';
import Dialog from './Dialog';

export default function ColorField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, style?: any, containerStyle?: any }) {
  const [value, setValue] = useState(props.value);
  const [color, setColor] = useState(toHsv(props.value));
  const [error, onErrorChange] = useBaseField(props);
  const [show, setShow] = useState(false);
  const hasError = error || (props.required && (!value || value && value.length === 0));
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  useEffect(() => {
    setValue(props.value);
    setColor(toHsv(props.value));
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    setColor(toHsv(v));
    props.onValueChange(v);
  }

  function getTextInputStyle() {
    if (hasError) {
      if (props.disabled) {
        return isDarkTheme ? styles.hasErrorDisabledDark : styles.hasErrorDisabledLight;
      }
      return isDarkTheme ? styles.hasErrorDefaultDark : styles.hasErrorDefaultLight;
    }
    if (props.disabled) {
      return isDarkTheme ? styles.disabledDarkTextInput : styles.disabledLightTextInput;
    }
    return isDarkTheme ? styles.defaultDarkTextInput : styles.defaultLightTextInput;
  }

  function showColorPicker(){
    // setShow(true);
  }

  function hideColorPicker(){
    setShow(false);
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      <Dialog visible={show} onClose={hideColorPicker}>
        <View style={{flex: 1, backgroundColor: '#212021'}}>
          <ColorPicker style={{ flex: 1 }} oldColor='purple' color={color} onColorSelected={onValueChange} />
        </View>
      </Dialog>
      <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={showColorPicker}>
        <View style={[styles.colorDot, { backgroundColor: value }, getTextInputStyle()]}></View>
      </TouchableOpacity>
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  colorDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: Colors.black,
    borderWidth: 1,
  },
  textInput: {
    fontFamily: Styles.fontFamilyBody,
    fontWeight: '400',
    fontSize: 16,
    height: 36,
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  defaultLightTextInput: {
    color: Colors.contentDefaultLight,
    borderColor: Colors.inputDefaultLight,
  },
  defaultDarkTextInput: {
    color: Colors.contentDefaultDark,
    borderColor: Colors.inputDefaultDark,
  },
  disabledLightTextInput: {
    color: Colors.contentDisabledLight,
    borderColor: Colors.inputDisabledLight,
    borderStyle: 'dotted',
  },
  disabledDarkTextInput: {
    color: Colors.contentDisabledDark,
    borderColor: Colors.inputDisabledDark,
    borderStyle: 'dotted',
  },
  hasErrorDefaultLight: {
    color: Colors.contentDefaultLight,
    borderColor: Colors.errorDefaultLight,
  },
  hasErrorDefaultDark: {
    color: Colors.contentDefaultDark,
    borderColor: Colors.errorDefaultDark,
  },
  hasErrorDisabledLight: {
    color: Colors.contentDisabledLight,
    borderColor: Colors.errorDisabledLight,
  },
  hasErrorDisabledDark: {
    color: Colors.contentDisabledDark,
    borderColor: Colors.errorDisabledDark,
  },
});
