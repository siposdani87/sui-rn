import React, { useState } from 'react';
import ErrorField from '../common/ErrorField';
import Label from '../common/Label';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Styles } from '../../constants';
import { MaterialIcons } from '@expo/vector-icons';
import useBaseField from '../common/BaseField';

export default function CheckboxField(props) {
  const [value, setValue] = useState(false);
  const [error, onChange, onValueChange] = useBaseField(props);

  function changeValue() {
    const newValue = !value;
    onValueChange(newValue);
    setValue(newValue);
  }

  function getColor() {
    if (props.disabled) {
      return Colors.greyBright;
    } else if (props.required && !value) {
      return Colors.red;
    } else if (value) {
      return props.color;
    }
    return Colors.grey;
  }

  return (
    <View style={styles.baseContainer}>
      <TouchableOpacity activeOpacity={Styles.activeOpacity} onPress={changeValue} style={[props.style, styles.checkbox]}>
        <MaterialIcons name={value ? 'check-box' : 'check-box-outline-blank'} size={26} color={getColor()} />
      </TouchableOpacity>
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
    marginLeft: 30,
  },
  checkbox: {
    position: 'absolute',
    top: -3,
    left: 0,
  },
});
