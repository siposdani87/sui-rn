import React, { ReactNode } from 'react';
import { ErrorValueType } from './ErrorField';
import { TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
export type TextFieldValueType = any;
export declare function TextField(props: {
    value: TextFieldValueType;
    onValueChange: (value: TextFieldValueType) => void;
    readonly?: boolean;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
    actionButtons?: ReactNode[];
} & TextInputProps): React.JSX.Element;
