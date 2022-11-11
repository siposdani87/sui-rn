/// <reference types="react" />
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { TextFieldValueType } from './TextField';
export declare type PhoneFieldValueType = TextFieldValueType;
export declare function PhoneField(props: {
    value: PhoneFieldValueType;
    onValueChange: (_value: PhoneFieldValueType) => void;
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
