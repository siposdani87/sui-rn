import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import useErrorField from '../hooks/useErrorField';
import useDarkTheme from '../hooks/useDarkTheme';

export default function IconToggleField(props: { value: any, checkedIcon: string, uncheckedIcon: string, trueValue?: any, falseValue?: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any, children?: any }) {
  const trueValue = props.trueValue || true;
  const falseValue = props.falseValue || false;
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useErrorField(props.error);
  const isDarkTheme = useDarkTheme();

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    props.onValueChange(v);
  }

  function onPress() {
    const v = value === trueValue ? falseValue : trueValue;
    onValueChange(v);
  }

  function getColor() {
    if (props.disabled) {
      return isDarkTheme ? Colors.checkboxDisabledDark : Colors.checkboxDisabledLight;
    } else if (props.required && value === falseValue) {
      return isDarkTheme ? Colors.errorDefaultDark : Colors.errorDefaultLight;
    } else if (value === trueValue) {
      return isDarkTheme ? Colors.primaryBright : Colors.primary;
    }
    return isDarkTheme ? Colors.checkboxDefaultDark : Colors.checkboxDefaultLight;
  }

  function getIcon(): string {
    return value === trueValue ? props.checkedIcon : props.uncheckedIcon;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={onPress} style={[styles.iconToggle, props.style]}>
        <MaterialIcons name={getIcon()} size={26} color={getColor()} />
      </TouchableOpacity>
      <Label containerStyle={styles.label} text={props.label} onPress={onPress} required={props.required} disabled={props.disabled}>{props.children}</Label>
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginLeft: 30,
  },
  iconToggle: {
    position: 'absolute',
    top: -3,
    left: 0,
    zIndex: 1,
  },
});
