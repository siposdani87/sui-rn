import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TextFieldValueType } from './TextField';
import { ErrorValueType } from './ErrorField';
export type NumberFieldValueType = TextFieldValueType;
export declare function NumberField(props: {
    value: NumberFieldValueType;
    onValueChange: (value: NumberFieldValueType) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: ReactNode[];
}): React.JSX.Element;
