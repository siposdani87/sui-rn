import React from 'react';
import TextField from './TextField';
import { TextInputProps } from 'react-native';

export default function PhoneField(props: { value: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any, children?: any } & TextInputProps) {
  return (
    <TextField {...props} value={(props.value || '').toString()} keyboardType='phone-pad'>
      {props.children}
    </TextField>
  );
}
