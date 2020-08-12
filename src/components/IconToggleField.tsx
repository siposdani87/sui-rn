import React from 'react';
import CheckboxField from './CheckboxField';

export default function IconToggleField(props: { value: boolean, onValueChange: (value: any) => void, error: any, disabled?: boolean, required?: boolean, label?: string, children?: any, style?: any, checkedIcon: string, uncheckedIcon: string }) {
  return (
    <CheckboxField value={props.value} onValueChange={props.onValueChange} error={props.error} style={props.style} label={props.label} required={props.required} disabled={props.disabled} checkedIcon={props.checkedIcon} uncheckedIcon={props.uncheckedIcon}>{props.children}</CheckboxField>
  );
}
