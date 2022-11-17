/// <reference types="react" />
import { ErrorValueType } from './ErrorField';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export declare type RichTextAreaFieldValueType = string | null | undefined;
export declare function RichTextAreaField(props: {
    value: RichTextAreaFieldValueType;
    onValueChange: (_value: RichTextAreaFieldValueType) => void;
    numberOfLines?: number;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
}): JSX.Element;
