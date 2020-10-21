import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import { MaterialIcons } from '@expo/vector-icons';
import { Styles } from '../constants';
import environment from '../config/environment';

export default function SelectField(props: { value: any, items: any, onValueChange: (value: any) => void, error: any, color?: string, disabled?: boolean, required?: boolean, label?: string, placeholder?: string, labelKey?: string, valueKey?: string, style?: any, containerStyle?: any }) {
  const [value, setValue] = useState(props.value);
  const [items, setItems] = useState(convert(props.items));
  const [error, onErrorChange] = useBaseField(props);
  const hasError = error || (props.required && (!value || value && value.length === 0));
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    setItems(convert(props.items));
  }, [props.items]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    props.onValueChange(v);
  }

  function convert(options) {
    const results = options.map((option) => {
      const optionValue = option[props.valueKey || 'value'];
      return {
        key: optionValue,
        value: optionValue,
        label: option[props.labelKey || 'label'],
      };
    });
    return results;
  }

  function _getTextInputStyle() {
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

  function _getPickerSelectStyles() {
    const selectStyle = {
      ...(isDarkTheme ? pickerSelectDarkStyles : pickerSelectLightStyles),
      done: {
        color: props.color || Colors.primary,
      },
      inputIOS: {
        ...styles.input as any,
        ..._getTextInputStyle() as any,
      },
      inputAndroid: {
        ...styles.input as any,
        ..._getTextInputStyle() as any,
      },
    };

    return selectStyle;
  }

  const pickerStyle = _getPickerSelectStyles();

  function getIcon() {
    return (<MaterialIcons name='expand-more' size={24} color={pickerStyle.inputAndroid.color} />);
  }

  return (
    <View style={[styles.baseContainer, props.containerStyle]}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      {/* {false && (
        <Picker {...props} selectedValue={value} onValueChange={onValueChange} style={[props.style, styles.picker]} itemStyle={{ height: 52 }}>
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      )} */}
      {items.length > 0 && (
        <RNPickerSelect Icon={getIcon} useNativeAndroidPickerStyle={false} placeholder={{ label: props.placeholder || '', value: null }} items={items} value={value} key={value} onValueChange={onValueChange} style={pickerStyle as any} disabled={props.disabled} />
      )}
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
  picker: {
    height: 36,
  },
  input: {
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

const pickerSelectLightStyles = StyleSheet.create({
  iconContainer: {
    top: 5,
    right: 5,
  },
  placeholderColor: {
    color: Colors.labelDefaultLight,
  },
});

const pickerSelectDarkStyles = StyleSheet.create({
  iconContainer: {
    top: 5,
    right: 5,
  },
  placeholderColor: {
    color: Colors.labelDefaultDark,
  },
});
