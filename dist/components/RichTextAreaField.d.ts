import React from 'react';
import { ErrorValueType } from './ErrorField';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export type RichTextAreaFieldValueType = string | null | undefined;
export declare function RichTextAreaField(props: {
    value: RichTextAreaFieldValueType;
    onValueChange: (value: RichTextAreaFieldValueType) => void;
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
