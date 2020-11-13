import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, Switch, StyleSheet, Platform } from 'react-native';
import { Colors } from '../constants';
import useErrorField from '../hooks/useErrorField';
import useDarkTheme from '../hooks/useDarkTheme';

export default function SwitchField(props: { value: any, onValueChange: (value: any) => void, trueValue?: any, falseValue?: any, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any }) {
  const trueValue = props.trueValue || true;
  const falseValue = props.falseValue || false;
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useErrorField(props.error);
  const isDarkTheme = useDarkTheme();

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(boolV) {
    const v = boolV ? trueValue : falseValue;
    onErrorChange();
    setValue(v);
    props.onValueChange(v);
  }

  function getTrackColor() {
    return {
      false: isDarkTheme ? Colors.contentDefaultDark : Colors.contentDefaultLight,
      true: isDarkTheme ? Colors.primary : Colors.primaryBright,
    };
  }

  function getThumbColor() {
    if (props.disabled) {
      return isDarkTheme ? Colors.checkboxDisabledDark : Colors.checkboxDisabledLight;
    } else if (props.required && !value) {
      return isDarkTheme ? Colors.errorDefaultDark : Colors.errorDefaultLight;
    } else if (value) {
      return isDarkTheme ? Colors.primaryBright : Colors.primary;
    }
    return isDarkTheme ? Colors.checkboxDefaultDark : Colors.checkboxDefaultLight;
  }

  function getValue(): boolean{
    return value === trueValue;
  }

  function onPress() {
    const v = value === trueValue ? falseValue : trueValue;
    setValue(v);
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Switch value={getValue()} onValueChange={onValueChange} style={[styles.switch, props.style]} disabled={props.disabled} ios_backgroundColor={getTrackColor().false} trackColor={getTrackColor()} thumbColor={getThumbColor()} />
      <Label onPress={onPress} containerStyle={styles.label} text={props.label} required={props.required} desc={props.desc} onPressDesc={props.onPressDesc} />
      <ErrorField error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    ...Platform.select({
      android: {
        marginLeft: 50,
      },
      ios: {
        marginLeft: 60,
      }
    }),
  },
  switch: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    ...Platform.select({
      android: {
        top: -1,
      },
      ios: {
        top: -6,
      }
    }),
  },
});
