import React, { useState, useEffect } from 'react';
import ErrorField from '../common/ErrorField';
import Label from '../common/Label';
import { View, Switch, StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import useBaseField from '../common/BaseField';

export default function SwitchField(props) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useBaseField(props);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    props.onValueChange(v);
    setValue(v);
  }

  return (
      <View style={styles.baseContainer}>
        <Switch {...props} value={value} onValueChange={onValueChange} style={[props.style, styles.switch]} disabled={props.disabled} onTintColor={Colors.primaryBright} thumbTintColor={props.disabled ? Colors.lightGreyDark : (!value ? Colors.whiteDark : Colors.primary)} tintColor={Colors.lightGreyDark} />
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
    marginLeft: 55,
  },
  switch: {
    position: 'absolute',
    top: -3,
    left: 0,
  },
});