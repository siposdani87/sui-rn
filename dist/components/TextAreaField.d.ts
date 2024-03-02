import React from 'react';
import { TextFieldValueType } from './TextField';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';
export type TextAreaFieldValueType = TextFieldValueType;
export declare function TextAreaField(props: {
    value: TextAreaFieldValueType;
    onValueChange: (value: TextAreaFieldValueType) => void;
    numberOfLines?: number;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
}): React.JSX.Element;
