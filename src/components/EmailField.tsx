import React from 'react';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { TextField, TextFieldValueType } from './TextField';

export type EmailFieldValueType = TextFieldValueType;

export function EmailField(
    props: {
        value: EmailFieldValueType;
        onValueChange: (_value: EmailFieldValueType) => void;
        label?: string;
        error?: string[] | null;
        required?: boolean;
        disabled?: boolean;
        desc?: string;
        onPressDesc?: () => void;
        containerStyle?: StyleProp<ViewStyle>;
        style?: StyleProp<ViewStyle>;
        actionButtons?: JSX.Element[];
    } & TextInputProps,
): JSX.Element {
    return (
        <TextField
            value={props.value}
            error={props.error}
            onValueChange={props.onValueChange}
            label={props.label}
            desc={props.desc}
            onPressDesc={props.onPressDesc}
            required={props.required}
            disabled={props.disabled}
            containerStyle={props.containerStyle}
            style={props.style}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete={props.autoComplete}
            textContentType={props.textContentType}
            actionButtons={props.actionButtons}
        />
    );
}
