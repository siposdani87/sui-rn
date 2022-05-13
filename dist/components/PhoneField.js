import React from 'react';
import { TextField } from './TextField';
export function PhoneField(props) {
    return (<TextField value={props.value} error={props.error} onValueChange={props.onValueChange} label={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} containerStyle={props.containerStyle} style={props.style} keyboardType="phone-pad" autoComplete={props.autoComplete} textContentType={props.textContentType} actionButtons={props.actionButtons}/>);
}
//# sourceMappingURL=PhoneField.js.map