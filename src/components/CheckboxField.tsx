import React from 'react';
import IconToggleField from './IconToggleField';

export default function CheckboxField(props: { value: any, trueValue?: any, falseValue?: any, onValueChange: (value: any) => void, label?: string, error?: any, required?: boolean, disabled?: boolean, containerStyle?: any, style?: any, children?: any }) {
  return (
    <IconToggleField value={props.value} onValueChange={props.onValueChange} trueValue={props.trueValue} falseValue={props.falseValue} error={props.error} containerStyle={props.containerStyle} style={props.style} label={props.label} required={props.required} disabled={props.disabled} checkedIcon='check-box' uncheckedIcon='check-box-outline-blank'>
      {props.children}
    </IconToggleField>
  );
}
