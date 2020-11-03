import React, { useState, useEffect } from 'react';
import ErrorField from './ErrorField';
import Label from './Label';
import { View, TextInput, StyleSheet, TextInputProps, Platform } from 'react-native';
import { Colors, Styles } from '../constants';
import useErrorField from '../hooks/useErrorField';
import useInputStyle from '../hooks/useInputStyle';

export default function TextField(props: { value: any, onValueChange: (value: any) => void, readonly?: boolean, label?: string, error?: any, required?: boolean, disabled?: boolean, placeholder?: string, containerStyle?: any, style?: any, children?: any } & TextInputProps) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useErrorField(props.error);
  const getInputStyle = useInputStyle(value, error, props.required, props.disabled);
  
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(v) {
    onErrorChange();
    setValue(v);
    props.onValueChange(v);
  }

  function getPlaceholderTextColor(){
    return Colors.grey;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Label text={props.label} required={props.required} disabled={props.disabled} />
      <TextInput value={value} style={[styles.textInput, props.style, getInputStyle()]} onChangeText={onValueChange} placeholderTextColor={getPlaceholderTextColor()} placeholder={props.placeholder} underlineColorAndroid='transparent' selectionColor={Colors.deepGreyBright} numberOfLines={props.numberOfLines} multiline={props.multiline} keyboardType={props.keyboardType} secureTextEntry={props.secureTextEntry} autoCapitalize={props.autoCapitalize} editable={!props.disabled && !props.readonly} />
      {props.children && (
        <View style={[styles.actionsContainer, Platform.select({
          android: {
            top: props.label ? 26 : -2,
          },
          ios: {
            top: props.label ? 22 : -2,
          },
        })]}>
          {props.children}
        </View>
      )}
      <ErrorField error={error} disabled={props.disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  actionsContainer: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    zIndex: 1,
  },
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
