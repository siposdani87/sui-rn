/// <reference types="react" />
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { TextFieldValueType } from './TextField';
export declare type EmailFieldValueType = TextFieldValueType;
export declare function EmailField(props: {
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
} & TextInputProps): JSX.Element;
