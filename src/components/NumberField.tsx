import React, { useEffect, useState } from 'react';
import useErrorField from '../hooks/useErrorField';
import TextField from './TextField';

export default function NumberField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
    actionButtons?: any[];
}): JSX.Element {
    const [value, setValue] = useState<any>(props.value);
    const [error, onErrorChange] = useErrorField(props.error);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onValueChange = (v: string): void => {
        let floatValue = parseFloat(v);
        if (isNaN(floatValue)) {
            floatValue = 0;
        }
        onErrorChange();
        setValue(floatValue);
        props.onValueChange(floatValue);
    };

    return (
        <TextField
            value={value}
            error={error}
            onValueChange={onValueChange}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            desc={props.desc}
            onPressDesc={props.onPressDesc}
            containerStyle={props.containerStyle}
            style={props.style}
            keyboardType="numeric"
            actionButtons={props.actionButtons}
        />
    );
}
