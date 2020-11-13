import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, StyleSheet } from 'react-native';
import { Colors, Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import Slider from '@react-native-community/slider';
import useInputStyle from '../hooks/useInputStyle';
import useDarkTheme from '../hooks/useDarkTheme';

export default function SliderField(props: { value: any, onValueChange: (value: any) => void, minimumValue?: number, maximumValue?: number, step?: number, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any }) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useErrorField(props.error);
  const getInputStyle = useInputStyle(value, error, props.required, props.disabled);
  const isDarkTheme = useDarkTheme();

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    props.onValueChange(v);
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label text={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} />
      <Slider style={[{flex: 1, height: 40}, props.style, getInputStyle()]} value={value} onSlidingComplete={onValueChange} step={props.step} minimumValue={props.minimumValue} maximumValue={props.maximumValue} minimumTrackTintColor={Colors.grey} maximumTrackTintColor={Colors.grey} thumbTintColor={isDarkTheme ? Colors.primaryBright : Colors.primary} disabled={props.disabled} />
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInput: {
    fontFamily: Styles.fontFamilyBody,
    fontWeight: '400',
    fontSize: 16,
    height: 36,
    borderRadius: 3,
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
