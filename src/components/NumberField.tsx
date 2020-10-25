import React from 'react';
import TextField from './TextField';

export default function NumberField(props: { value: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any, children?: any }) {
  function onValueChange(v){
    props.onValueChange(parseFloat(v));
  }
  
  return (
    <TextField {...props} value={(props.value || '').toString()} keyboardType='numeric' onValueChange={onValueChange}>
      {props.children}
    </TextField>
  );
}
