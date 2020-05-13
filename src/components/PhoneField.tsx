import React from 'react';
import TextField from './TextField';

export default function PhoneField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, style?: any}) {
  return (
    <TextField {...props} value={(props.value || '').toString()} keyboardType='phone-pad' />
  );
}
