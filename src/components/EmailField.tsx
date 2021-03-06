import React from 'react';
import { TextInputProps } from 'react-native';
import TextField from './TextField';

export default function EmailField(props: { value: any, onValueChange: (_value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any, actionButtons?: any[] } & TextInputProps) {
  return (
    <TextField value={props.value} error={props.error} onValueChange={props.onValueChange} label={props.label} desc={props.desc} onPressDesc={props.onPressDesc} required={props.required} disabled={props.disabled} containerStyle={props.containerStyle} style={props.style} autoCapitalize='none' keyboardType='email-address' autoCompleteType={props.autoCompleteType} textContentType={props.textContentType} actionButtons={props.actionButtons} />
  );
}
