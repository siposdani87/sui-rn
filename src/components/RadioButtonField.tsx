import React, { ReactNode, useEffect, useState } from 'react';
import { useErrorField } from '../hooks';
import { IconToggleField, IconToggleFieldValueType } from './IconToggleField';
import { BaseFieldProps } from './BaseFieldProps';

export type RadioButtonFieldField = IconToggleFieldValueType;

export function RadioButtonField(
    props: BaseFieldProps & {
        value: RadioButtonFieldField;
        trueValue?: RadioButtonFieldField;
        falseValue?: RadioButtonFieldField;
        onValueChange: (value: RadioButtonFieldField) => void;
        children?: ReactNode;
    },
) {
    const [value, setValue] = useState<RadioButtonFieldField>(props.value);
    const [error, onErrorChange] = useErrorField(props.error);

    const onValueChange = (v: RadioButtonFieldField): void => {
        if (v === props.trueValue) {
            onErrorChange();
            setValue(v);
            props.onValueChange(v);
        }
    };

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (
        <IconToggleField
            value={value}
            onValueChange={onValueChange}
            trueValue={props.trueValue}
            falseValue={props.falseValue}
            disableUncheck={true}
            error={error}
            containerStyle={props.containerStyle}
            style={props.style}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            desc={props.desc}
            onPressDesc={props.onPressDesc}
            checkedIcon="radio-button-checked"
            uncheckedIcon="radio-button-unchecked"
        >
            {props.children}
        </IconToggleField>
    );
}
