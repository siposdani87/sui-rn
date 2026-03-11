import React, { ReactNode } from 'react';
import { IconToggleField, IconToggleFieldValueType } from './IconToggleField';
import { BaseFieldProps } from './BaseFieldProps';

export type CheckboxFieldValueType = IconToggleFieldValueType;

export function CheckboxField(
    props: BaseFieldProps & {
        value: CheckboxFieldValueType;
        trueValue?: CheckboxFieldValueType;
        falseValue?: CheckboxFieldValueType;
        onValueChange: (value: CheckboxFieldValueType) => void;
        children?: ReactNode;
    },
) {
    return (
        <IconToggleField
            value={props.value}
            onValueChange={props.onValueChange}
            trueValue={props.trueValue}
            falseValue={props.falseValue}
            error={props.error}
            containerStyle={props.containerStyle}
            style={props.style}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            desc={props.desc}
            onPressDesc={props.onPressDesc}
            checkedIcon="check-box"
            uncheckedIcon="check-box-outline-blank"
        >
            {props.children}
        </IconToggleField>
    );
}
