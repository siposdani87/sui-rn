import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useErrorField } from '../hooks/useErrorField';
import { TextField, TextFieldValueType } from './TextField';
import { ErrorValueType } from './ErrorField';

export type NumberFieldValueType = TextFieldValueType;

export function NumberField(props: {
    value: NumberFieldValueType;
    onValueChange: (_value: NumberFieldValueType) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: JSX.Element[];
}): JSX.Element {
    const [value, setValue] = useState<NumberFieldValueType>(props.value);
    const [error, onErrorChange] = useErrorField(props.error);

    const onValueChange = (v: string): void => {
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
