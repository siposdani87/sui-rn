import React from 'react';
import TextField from './TextField';
import { TextInputProps } from 'react-native';

export default function PasswordField(props: { value: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any, children?: any } & TextInputProps) {
  return (
    <TextField {...props} secureTextEntry={true}>
      {props.children}
    </TextField>
  );
}
