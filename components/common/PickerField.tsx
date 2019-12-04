import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import ErrorField from '../common/ErrorField';
import Label from '../common/Label';
import { View, StyleSheet, Picker } from 'react-native';
import { Colors } from '../../constants';
import useBaseField from '../common/BaseField';

export default function PickerField(props) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);

  function onValueChange(v) {
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
  }

  return (
    <View style={styles.baseContainer}>
      <Label label={props.label} required={props.required} />
      {false && (
        <Picker {...props} selectedValue={value} onValueChange={onValueChange} style={[props.style, styles.picker]} itemStyle={{ height: 52 }}>
          {props.items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      )}
      <RNPickerSelect placeholder={{ label: props.label, value: null }} items={props.items} onValueChange={onValueChange} style={{ done: { color: props.color }, ...pickerSelectStyles }} value={value} />
      <ErrorField error={error} />
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 36,
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    color: Colors.black,
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
    backgroundColor: Colors.grey,
  },
  placeholderColor: {
    color: Colors.grey,
  },
  inputAndroid: {
    height: 36,
    backgroundColor: Colors.white,
  },
});
