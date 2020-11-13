import React from 'react';
import { TextInputProps } from 'react-native';
import TextField from './TextField';

export default function EmailField(props: { value: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any, children?: any } & TextInputProps) {
  return (
    <TextField value={props.value} error={props.error} onValueChange={props.onValueChange} label={props.label} required={props.required} disabled={props.disabled} containerStyle={props.containerStyle} style={props.style} autoCapitalize='none' keyboardType='email-address' autoCompleteType={props.autoCompleteType} textContentType={props.textContentType}>
      {props.children}
    </TextField>
  );
}
