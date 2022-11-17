/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { TextFieldValueType } from './TextField';
import { ErrorValueType } from './ErrorField';
export declare type SearchFieldValueType = TextFieldValueType;
export declare function SearchField(props: {
    value: SearchFieldValueType;
    onValueChange: (_value: SearchFieldValueType) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: JSX.Element[];
}): JSX.Element;
