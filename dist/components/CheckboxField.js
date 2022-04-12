import React from 'react';
import { IconToggleField } from './IconToggleField';
export function CheckboxField(props) {
    return (<IconToggleField value={props.value} onValueChange={props.onValueChange} trueValue={props.trueValue} falseValue={props.falseValue} error={props.error} containerStyle={props.containerStyle} style={props.style} label={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} checkedIcon="check-box" uncheckedIcon="check-box-outline-blank">
            {props.children}
        </IconToggleField>);
}
//# sourceMappingURL=CheckboxField.js.map