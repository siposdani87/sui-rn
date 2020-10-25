import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function IconToggleField(props: { value: boolean, checkedIcon: string, uncheckedIcon: string, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any, children?: any }) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    props.onValueChange(v);
  }

  function onPress() {
    onValueChange(!value);
  }

  function getColor() {
    if (props.disabled) {
      return isDarkTheme ? Colors.checkboxDisabledDark : Colors.checkboxDisabledLight;
    } else if (props.required && !value) {
      return isDarkTheme ? Colors.errorDefaultDark : Colors.errorDefaultLight;
    } else if (value) {
      return isDarkTheme ? Colors.primaryBright : Colors.primary;
    }
    return isDarkTheme ? Colors.checkboxDefaultDark : Colors.checkboxDefaultLight;
  }

  function getIcon(v){
    return v ? props.checkedIcon : props.uncheckedIcon;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={onPress} style={[styles.iconToggle, props.style]}>
        <MaterialIcons name={getIcon(value)} size={26} color={getColor()} />
      </TouchableOpacity>
      <Label containerStyle={styles.label} label={props.label} required={props.required} disabled={props.disabled}>{props.children}</Label>
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
