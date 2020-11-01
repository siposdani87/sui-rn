import React, { useState, useEffect, useRef } from 'react';
import ErrorField from './ErrorField';
import SUI from 'sui-js';
import Label from './Label';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';
import HsvColorPicker from 'react-native-hsv-color-picker';
import Dialog from './Dialog';
import Button from './Button';

export default function ColorField(props: { value: any, onValueChange: (value: any) => void, okText: string, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any }) {
  const [value, setValue] = useState(props.value);
  const [color, setColor] = useState(SUI.HEXToHSV(props.value));
  const [hue, setHue] = useState(0);
  const [sat, setSat] = useState(0);
  const [val, setVal] = useState(1);
  const [error, onErrorChange] = useBaseField(props);
  const [visible, setVisible] = useState(false);
  const colorPickerRef = useRef(null);
  const hasError = error || (props.required && (!value || value && value.length === 0));
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  useEffect(() => {
    setValue(props.value);
    setColor(SUI.HEXToHSV(props.value));
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    setColor(SUI.HEXToHSV(v));
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

  function showColorPicker() {
    const [h, s, v] = color;
    setHue(h);
    setSat(s);
    setVal(v);
    setVisible(true);
  }

  function hideColorPicker() {
    setVisible(false);
  }

  function onSatValPickerChange(c) {
    setSat(c.saturation);
    setVal(c.value);
  }

  function onHuePickerChange(c) {
    setHue(c.hue);
  }

  function selectColor() {
    hideColorPicker();
    const hexColor = colorPickerRef.current.getCurrentColor();
    onValueChange(hexColor);
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      <Dialog visible={visible} title={props.label} onClose={hideColorPicker} buttons={[
            <Button title={props.okText} onPress={selectColor} />
          ]}>
        <HsvColorPicker ref={colorPickerRef}
          huePickerHue={hue}
          onHuePickerDragEnd={onHuePickerChange}
          onHuePickerPress={onHuePickerChange}
          satValPickerHue={hue}
          satValPickerSaturation={sat}
          satValPickerValue={val}
          onSatValPickerDragEnd={onSatValPickerChange}
          onSatValPickerPress={onSatValPickerChange}
        />
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
