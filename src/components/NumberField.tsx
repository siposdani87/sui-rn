import React, { ReactNode, useEffect, useState } from 'react';
import { useErrorField } from '../hooks';
import { TextField } from './TextField';
import { BaseFieldProps } from './BaseFieldProps';

export type NumberFieldValueType = number | null | undefined;

export function NumberField(
    props: BaseFieldProps & {
        value: NumberFieldValueType;
        onValueChange: (value: NumberFieldValueType) => void;
        actionButtons?: ReactNode[];
    },
) {
    const [value, setValue] = useState<NumberFieldValueType>(props.value);
    const [error, onErrorChange] = useErrorField(props.error);

    const onValueChange = (v: string | null | undefined): void => {
        let floatValue = parseFloat(v ?? '');
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

    return (
        <TextField
            value={value?.toString() ?? ''}
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
