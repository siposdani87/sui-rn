import React from 'react';
import { TextField, TextFieldValueType } from './TextField';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

export type TextAreaFieldValueType = TextFieldValueType;

export function TextAreaField(props: {
    value: TextAreaFieldValueType;
    onValueChange: (_value: TextAreaFieldValueType) => void;
    numberOfLines?: number;
    label?: string;
    error?: string[] | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
}): JSX.Element {
    const style = StyleSheet.flatten(props.style);
    const numberOfLines = props.numberOfLines || 5;
    const height = 20 * numberOfLines + 16;

    const textareaStyle: StyleProp<TextStyle> = {
        height,
        textAlignVertical: 'top',
        paddingTop: 5,
        ...style,
    };

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
            style={textareaStyle}
            multiline={true}
            numberOfLines={numberOfLines}
        />
    );
}
