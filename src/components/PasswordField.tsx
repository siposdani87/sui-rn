import React, { ReactNode } from 'react';
import { TextInputProps } from 'react-native';
import { TextField, TextFieldValueType } from './TextField';
import { BaseFieldProps } from './BaseFieldProps';

export type PasswordFieldValueType = TextFieldValueType;

export function PasswordField(
    props: BaseFieldProps & {
        value: PasswordFieldValueType;
        onValueChange: (value: PasswordFieldValueType) => void;
        actionButtons?: ReactNode[];
    } & TextInputProps,
) {
    return (
        <TextField
            value={props.value}
            error={props.error}
            onValueChange={props.onValueChange}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            desc={props.desc}
            onPressDesc={props.onPressDesc}
            containerStyle={props.containerStyle}
            style={props.style}
            secureTextEntry={true}
            autoComplete={props.autoComplete}
            textContentType={props.textContentType}
            actionButtons={props.actionButtons}
        />
    );
}
