import React from 'react';
import { TextInputProps } from 'react-native';
import TextField from './TextField';

export default function PhoneField(props: { value: any, onValueChange: (_value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any, children?: any } & TextInputProps) {
  return (
    <TextField value={(props.value || '').toString()} error={props.error} onValueChange={props.onValueChange} label={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} containerStyle={props.containerStyle} style={props.style} keyboardType='phone-pad' autoCompleteType={props.autoCompleteType} textContentType={props.textContentType}>
      {props.children}
    </TextField>
  );
}
