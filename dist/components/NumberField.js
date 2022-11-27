import React, { useEffect, useState } from 'react';
import { useErrorField } from '../hooks/useErrorField';
import { TextField } from './TextField';
export function NumberField(props) {
    const [value, setValue] = useState(props.value);
    const [error, onErrorChange] = useErrorField(props.error);
    const onValueChange = (v) => {
        let floatValue = parseFloat(v);
        if (isNaN(floatValue)) {
            floatValue = 0;
        }
        onErrorChange();
        setValue(floatValue);
        props.onValueChange(floatValue);
    };
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    return (<TextField value={value} error={error} onValueChange={onValueChange} label={props.label} required={props.required} disabled={props.disabled} desc={props.desc} onPressDesc={props.onPressDesc} containerStyle={props.containerStyle} style={props.style} keyboardType="numeric" actionButtons={props.actionButtons}/>);
}
//# sourceMappingURL=NumberField.js.map