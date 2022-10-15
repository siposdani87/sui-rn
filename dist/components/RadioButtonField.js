import React, { useEffect, useState } from 'react';
import { useErrorField } from '../hooks/useErrorField';
import { IconToggleField } from './IconToggleField';
export function RadioButtonField(props) {
    const [value, setValue] = useState(props.value);
    const [error, onErrorChange] = useErrorField(props.error);
    const onValueChange = (v) => {
        if (v === props.trueValue) {
            onErrorChange();
            setValue(v);
            props.onValueChange(v);
        }
    };
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    return (<IconToggleField value={value} onValueChange={onValueChange} trueValue={props.trueValue} disableUncheck={true} error={error} containerStyle={props.containerStyle} style={props.style} label={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} checkedIcon="radio-button-checked" uncheckedIcon="radio-button-unchecked">
            {props.children}
        </IconToggleField>);
}
//# sourceMappingURL=RadioButtonField.js.map