/// <reference types="react" />
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { TextFieldValueType } from './TextField';
import { ErrorValueType } from './ErrorField';
export declare type PasswordFieldValueType = TextFieldValueType;
export declare function PasswordField(props: {
    value: PasswordFieldValueType;
    onValueChange: (_value: PasswordFieldValueType) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: JSX.Element[];
} & TextInputProps): JSX.Element;
