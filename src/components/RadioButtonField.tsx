import React, { useEffect, useState } from 'react';
import useErrorField from '../hooks/useErrorField';
import IconToggleField from './IconToggleField';

export default function RadioButtonField(props: { value: any, trueValue?: any, onValueChange: (_value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, desc?: string, onPressDesc?: () => void, containerStyle?: any, style?: any, children?: any }) {
  const [value, setValue] = useState(props.value);
  const [error, onErrorChange] = useErrorField(props.error);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function onValueChange(v) {
    if (v === props.trueValue) {
      onErrorChange();
      setValue(v);
      props.onValueChange(v);
    }
  }

  return (
    <IconToggleField value={value} onValueChange={onValueChange} trueValue={props.trueValue} error={error} containerStyle={props.containerStyle} style={props.style} label={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} checkedIcon='radio-button-checked' uncheckedIcon='radio-button-unchecked'>
      {props.children}
    </IconToggleField>
  );
}
