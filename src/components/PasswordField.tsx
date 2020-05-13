import React from 'react';
import TextField from './TextField';

export default function PasswordField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, style?: any}) {
  return (
    <TextField {...props} secureTextEntry={true} />
  );
}
