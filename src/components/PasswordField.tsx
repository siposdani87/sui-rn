import React from 'react';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import TextField from './TextField';

export default function PasswordField(
    props: {
        value: any;
        onValueChange: (_value: any) => void;
        label?: string;
        error?: any;
        required?: boolean;
        disabled?: boolean;
        desc?: string;
        onPressDesc?: () => void;
        containerStyle?: StyleProp<ViewStyle>;
        style?: StyleProp<ViewStyle>;
        actionButtons?: any[];
    } & TextInputProps,
): JSX.Element {
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
            autoCompleteType={props.autoCompleteType}
            textContentType={props.textContentType}
            actionButtons={props.actionButtons}
        />
    );
}
