import React from 'react';
import TextField from './TextField';
import { TextInputProps } from 'react-native';

export default function EmailField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, style?: any} & TextInputProps) {
  return (
    <TextField {...props} keyboardType='email-address' />
  );
}
