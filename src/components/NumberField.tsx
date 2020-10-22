import React from 'react';
import TextField from './TextField';

export default function NumberField(props: { value: any, label: string, error: any, onValueChange: (value: any) => void, required?: boolean, disabled?: boolean, style?: any, containerStyle?: any, children?: any }) {
  function onValueChange(v){
    props.onValueChange(parseFloat(v));
  }
  
  return (
    <TextField {...props} value={(props.value || '').toString()} keyboardType='numeric' onValueChange={onValueChange}>
      {props.children}
    </TextField>
  );
}
