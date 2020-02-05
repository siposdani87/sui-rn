import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, Picker } from 'react-native';
import { Colors } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';
import { MaterialIcons } from '@expo/vector-icons';
import { Styles } from '../constants';
import environment from '../config/environment';

export default function PickerField(props) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);
  const isDarkTheme = environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function _onValueChange(v) {
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
  }

  function _getPickerSelectStyles() {
    return {
      ...(isDarkTheme ? pickerSelectDarkStyles : pickerSelectLightStyles),
      done: {
        color: props.color || Colors.primary,
      },
    };
  }

  const pickerStyle = _getPickerSelectStyles();

  return (
    <View style={styles.baseContainer}>
      <Label label={props.label} required={props.required} disabled={props.disabled} />
      {false && (
        <Picker {...props} selectedValue={value} onValueChange={_onValueChange} style={[props.style, styles.picker]} itemStyle={{ height: 52 }}>
          {props.items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      )}
      <RNPickerSelect Icon={() => (<MaterialIcons name="expand-more" size={24} color={pickerStyle.inputAndroid.color} />)} useNativeAndroidPickerStyle={false} placeholder={{ label: props.label, value: null }} items={props.items} onValueChange={_onValueChange} style={pickerStyle} value={value} />
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
});

const pickerSelectLightStyles = StyleSheet.create({
  inputIOS: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 16,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: Colors.inputDefaultLight,
    backgroundColor: Colors.white,
    color: Colors.contentDefaultLight,
  },
  inputAndroid: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 16,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: Colors.inputDefaultLight,
    backgroundColor: Colors.white,
    color: Colors.contentDefaultLight,
  },
  iconContainer: {
    top: 5,
    right: 5,
  },
  placeholderColor: {
    color: Colors.labelDefaultLight,
  },
});

const pickerSelectDarkStyles = StyleSheet.create({
  inputIOS: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 16,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: Colors.inputDefaultDark,
    backgroundColor: Colors.blackDark,
    color: Colors.contentDefaultDark,
  },
  inputAndroid: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 16,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: Colors.inputDefaultDark,
    backgroundColor: Colors.blackDark,
    color: Colors.contentDefaultDark,
  },
  iconContainer: {
    top: 5,
    right: 5,
  },
  placeholderColor: {
    color: Colors.labelDefaultDark,
  },
});
