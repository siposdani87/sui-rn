import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { IconToggleField, IconToggleFieldValueType } from './IconToggleField';

export type CheckboxFieldValueType = IconToggleFieldValueType;

export function CheckboxField(props: {
    value: CheckboxFieldValueType;
    trueValue?: CheckboxFieldValueType;
    falseValue?: CheckboxFieldValueType;
    onValueChange: (_value: CheckboxFieldValueType) => void;
    label?: string;
    error?: string[] | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: JSX.Element | JSX.Element[];
}): JSX.Element {
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
