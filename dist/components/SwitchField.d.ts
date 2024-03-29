import React from 'react';
import { ErrorValueType } from './ErrorField';
import { StyleProp, ViewStyle } from 'react-native';
export type SwitchFieldValueType = any;
export declare function SwitchField(props: {
    value: SwitchFieldValueType;
    onValueChange: (value: SwitchFieldValueType) => void;
    trueValue?: SwitchFieldValueType;
    falseValue?: SwitchFieldValueType;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): React.JSX.Element;
