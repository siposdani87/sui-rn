import React from 'react';
import TextField from './TextField';
import { TextInputProps } from 'react-native';

export default function PhoneField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, style?: any, children?: any } & TextInputProps) {
  return (
    <TextField {...props} value={(props.value || '').toString()} keyboardType='phone-pad'>
      {props.children}
    </TextField>
  );
}
