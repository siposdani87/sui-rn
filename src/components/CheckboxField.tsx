import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function CheckboxField(props: { value: boolean, onValueChange: (value: any) => void, error: any, disabled?: boolean, required?: boolean, label?: string, children?: any, style?: any, checkedIcon?: string, uncheckedIcon?: string }) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;
  const checkedIcon = props.checkedIcon || 'check-box';
  const uncheckedIcon = props.uncheckedIcon || 'check-box-outline-blank';

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
  }

  function _onPress() {
    onValueChange(!value);
  }

  function _getColor() {
    if (props.disabled) {
      return isDarkTheme ? Colors.checkboxDisabledDark : Colors.checkboxDisabledLight;
    } else if (props.required && !value) {
      return isDarkTheme ? Colors.errorDefaultDark : Colors.errorDefaultLight;
    } else if (value) {
      return isDarkTheme ? Colors.primaryBright : Colors.primary;
    }
    return isDarkTheme ? Colors.checkboxDefaultDark : Colors.checkboxDefaultLight;
  }

  return (
    <View style={styles.baseContainer}>
      <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={_onPress} style={[props.style, styles.checkbox]}>
        <MaterialIcons name={value ? checkedIcon : uncheckedIcon} size={26} color={_getColor()} />
      </TouchableOpacity>
      <Label style={styles.label} label={props.label} required={props.required} disabled={props.disabled}>{props.children}</Label>
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
  label: {
    marginLeft: 30,
  },
  checkbox: {
    position: 'absolute',
    top: -3,
    left: 0,
  },
});
