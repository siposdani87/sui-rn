import React, { ReactNode } from 'react';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { TextField, TextFieldValueType } from './TextField';
import { ErrorValueType } from './ErrorField';

export type PasswordFieldValueType = TextFieldValueType;

export function PasswordField(
    props: {
        value: PasswordFieldValueType;
        onValueChange: (value: PasswordFieldValueType) => void;
        label?: string;
        error?: ErrorValueType;
        required?: boolean;
        disabled?: boolean;
        desc?: string;
        onPressDesc?: () => void;
        containerStyle?: StyleProp<ViewStyle>;
        style?: StyleProp<ViewStyle>;
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
