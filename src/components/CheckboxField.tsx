import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import useBaseField from './BaseField';
import { useColorScheme } from 'react-native-appearance';

export default function CheckboxField(props: { value: boolean, onValueChange: (v: any) => void, error: any, disabled?: boolean, required?: boolean, label?: string, text?: any, style?: any }) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const isDarkTheme = true; // = useColorScheme() === 'dark';

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function _onValueChange(v) {
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
  }

  function _onPress() {
    _onValueChange(!value);
  }

  function _getColor() {
    if (props.disabled) {
      return isDarkTheme ? Colors.deepGrey : Colors.greyBright;
    } else if (props.required && !value) {
      return isDarkTheme ? Colors.errorDefaultDark : Colors.errorDefaultLight;
    } else if (value) {
      return isDarkTheme ? Colors.primaryBright : Colors.primary;
    }
    return isDarkTheme ? Colors.lightGrey : Colors.greyDark;
  }

  return (
    <View style={styles.baseContainer}>
      <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={_onPress} style={[props.style, styles.checkbox]}>
        <MaterialIcons name={value ? 'check-box' : 'check-box-outline-blank'} size={26} color={_getColor()} />
      </TouchableOpacity>
      <Label style={styles.label} label={props.label} required={props.required} disabled={props.disabled}>{props.text}</Label>
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
