import React from 'react';
import TextField from './TextField';

export default function PhoneField(props: { value: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any, children?: any }) {
  return (
    <TextField value={(props.value || '').toString()} error={props.error} onValueChange={props.onValueChange} label={props.label} required={props.required} disabled={props.disabled} containerStyle={props.containerStyle} style={props.style} keyboardType='phone-pad'>
      {props.children}
    </TextField>
  );
}
