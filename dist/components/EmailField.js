import React from 'react';
import { TextField } from './TextField';
export function EmailField(props) {
    return (<TextField value={props.value} error={props.error} onValueChange={props.onValueChange} label={props.label} desc={props.desc} onPressDesc={props.onPressDesc} required={props.required} disabled={props.disabled} containerStyle={props.containerStyle} style={props.style} autoCapitalize="none" keyboardType="email-address" autoCompleteType={props.autoCompleteType} textContentType={props.textContentType} actionButtons={props.actionButtons}/>);
}
//# sourceMappingURL=EmailField.js.map