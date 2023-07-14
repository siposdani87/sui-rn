import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';
import { IconToggleFieldValueType } from './IconToggleField';
export type CheckboxFieldValueType = IconToggleFieldValueType;
export declare function CheckboxField(props: {
    value: CheckboxFieldValueType;
    trueValue?: CheckboxFieldValueType;
    falseValue?: CheckboxFieldValueType;
    onValueChange: (_value: CheckboxFieldValueType) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}): React.JSX.Element;
