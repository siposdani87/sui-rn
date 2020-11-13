import React, { useEffect, useState } from 'react';
import useErrorField from '../hooks/useErrorField';
import TextField from './TextField';

export default function NumberField(props: { value: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any, children?: any }) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useErrorField(props.error);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(v) {
    let floatValue = parseFloat(v);
    if (isNaN(floatValue)){
      floatValue = 0;
    }
    onErrorChange();
    setValue(floatValue);
    props.onValueChange(floatValue);
  }

  return (
    <TextField value={(value || '').toString()} error={error} onValueChange={onValueChange} label={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} containerStyle={props.containerStyle} style={props.style} keyboardType='numeric'>
      {props.children}
    </TextField>
  );
}
