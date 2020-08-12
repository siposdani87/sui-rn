import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, Switch, StyleSheet } from 'react-native';
import { Colors } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function SwitchField(props: { value: boolean, onValueChange: (value: any) => void, error: any, disabled?: boolean, required?: boolean, label?: string, text?: any, style?: any }) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
  }

  function getTrackColor() {
    return {
      false: isDarkTheme ? Colors.contentDefaultDark : Colors.contentDefaultLight,
      true: isDarkTheme ? Colors.primaryDefaultDark : Colors.primaryDefaultLight,
    };
  }

  function getThumbColor() {
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
      <Switch {...props} value={value} onValueChange={onValueChange} style={[props.style, styles.switch]} disabled={props.disabled} trackColor={getTrackColor()} thumbColor={getThumbColor()} />
      <Label style={styles.label} label={props.label} required={props.required}>{props.text}</Label>
      <ErrorField error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
  label: {
    marginLeft: 55,
  },
  switch: {
    position: 'absolute',
    top: -3,
    left: 0,
  },
});
