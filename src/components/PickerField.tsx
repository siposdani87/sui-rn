import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet, Picker } from 'react-native';
import { Colors } from '../constants';
import useBaseField from './useBaseField';
import { useColorScheme } from 'react-native-appearance';

export default function PickerField(props) {
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

  function _getPickerSelectStyles() {
    return {
      done: {
        color: props.color || Colors.primary,
      },
      ...(isDarkTheme ? pickerSelectDarkStyles : pickerSelectLightStyles),
    };
  }

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
      <RNPickerSelect placeholder={{ label: props.label, value: null }} items={props.items} onValueChange={_onValueChange} style={_getPickerSelectStyles()} value={value} />
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
    fontSize: 16,
    height: 36,
    borderBottomWidth: 1,
    borderColor: Colors.deepGreyBright,
    backgroundColor: Colors.white,
    color: Colors.inputDefaultLight,
  },
  inputAndroid: {
    fontSize: 16,
    height: 36,
    backgroundColor: Colors.white,
    color: Colors.inputDefaultLight,
  },
  chevron: {
    display: 'none',
  },
  icon: {
    right: 0,
    bottom: 5,
  },
  done: {
    color: Colors.primary,
    fontWeight: '400',
  },
  modalViewTop: {
    backgroundColor: 'transparent',
  },
  modalViewMiddle: {
    backgroundColor: Colors.lightGreyBright,
  },
  modalViewBottom: {
    backgroundColor: Colors.whiteDark,
  },
  underline: {
    backgroundColor: Colors.deepGreyBright,
  },
  placeholderColor: {
    color: Colors.deepGreyBright,
  },
});

const pickerSelectDarkStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 36,
    borderBottomWidth: 1,
    borderColor: Colors.deepGreyBright,
    backgroundColor: Colors.blackDark,
    color: Colors.inputDefaultDark,
  },
  inputAndroid: {
    fontSize: 16,
    height: 36,
    backgroundColor: Colors.blackDark,
    color: Colors.inputDefaultDark,
  },
  chevron: {
    display: 'none',
  },
  icon: {
    right: 0,
    bottom: 5,
  },
  done: {
    color: Colors.primary,
    fontWeight: '400',
  },
  modalViewTop: {
    backgroundColor: 'transparent',
  },
  modalViewMiddle: {
    backgroundColor: Colors.lightGreyBright,
  },
  modalViewBottom: {
    backgroundColor: Colors.whiteDark,
  },
  underline: {
    backgroundColor: Colors.deepGreyBright,
  },
  placeholderColor: {
    color: Colors.deepGreyBright,
  },
});
