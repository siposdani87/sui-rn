import React, { useState, useEffect } from 'react';
import ErrorField from '../common/ErrorField';
import Label from '../common/Label';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors, Styles } from '../../constants';
import useBaseField from '../common/BaseField';

export default function TextInputField(props) {
  // const {label, value, required, style} = props;
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    props.onChangeText(v);
    setValue(v);
  }

  return (
      <View style={styles.baseContainer}>
        <Label label={props.label} required={props.required} />
        <TextInput {...props} value={value} style={[props.style, styles.textInput, error || (props.required && (!value || value && value.length === 0)) ? styles.hasError : styles.noError]} onChangeText={onValueChange} underlineColorAndroid='transparent' selectionColor={Colors.grey} />
        <ErrorField error={error} />
      </View>
    );
}

const styles = StyleSheet.create({
  baseContainer: {
    marginBottom: 10,
  },
  textInput: {
    fontFamily: Styles.fontFamilyBody,
    fontSize: 16,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.greyBright,
    paddingHorizontal: 10,
  },
  hasError: {
    borderColor: Colors.red,
  },
  noError: {
    borderColor: Colors.greyBright,
  },
});
