/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { TextFieldValueType } from './TextField';
export declare type NumberFieldValueType = TextFieldValueType;
export declare function NumberField(props: {
    value: NumberFieldValueType;
    onValueChange: (_value: NumberFieldValueType) => void;
    label?: string;
    error?: string[] | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: JSX.Element[];
}): JSX.Element;
