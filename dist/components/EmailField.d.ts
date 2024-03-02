import React, { ReactNode } from 'react';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { TextFieldValueType } from './TextField';
import { ErrorValueType } from './ErrorField';
export type EmailFieldValueType = TextFieldValueType;
export declare function EmailField(props: {
    value: EmailFieldValueType;
    onValueChange: (value: EmailFieldValueType) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: ReactNode[];
} & TextInputProps): React.JSX.Element;
