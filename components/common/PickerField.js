import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import BaseField from '../common/BaseField';
import ErrorField from '../common/ErrorField';
import Label from '../common/Label';
import { View, StyleSheet, Picker } from 'react-native';
import { Colors } from '../../constants';

export default class PickerField extends BaseField {

  render() {
    return (
      <View style={styles.baseContainer}>
        <Label label={this.props.label} required={this.props.required} />
        {false && (
          <Picker {...this.props} selectedValue={this.props.value} onValueChange={this.onValueChange} style={[this.props.style, styles.picker]} itemStyle={{ height: 52 }}>
            {this.props.items.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        )}
        <RNPickerSelect placeholder={{ label: this.props.label, value: null }} items={this.props.items} onValueChange={this.onValueChange} style={{ done: { color: this.props.color }, ...pickerSelectStyles }} value={this.props.value} />
        <ErrorField error={this.state.error} />
      </View>
    );
  }
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
