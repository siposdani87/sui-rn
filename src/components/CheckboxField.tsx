import React from 'react';
import IconToggleField from './IconToggleField';

export default function CheckboxField(props: { value: boolean, onValueChange: (value: any) => void, error: any, disabled?: boolean, required?: boolean, label?: string, children?: any, style?: any }) {
  return (
    <IconToggleField value={props.value} onValueChange={props.onValueChange} error={props.error} style={props.style} label={props.label} required={props.required} disabled={props.disabled} checkedIcon='check-box' uncheckedIcon='check-box-outline-blank'>
      {props.children}
    </IconToggleField>
  );
}
