import { ReactNode } from 'react';
import { TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';
export type TextFieldValueType = any;
export declare function TextField(props: {
    value: TextFieldValueType;
    onValueChange: (_value: TextFieldValueType) => void;
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
} & TextInputProps): JSX.Element;
