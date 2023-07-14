import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';
export type SliderFieldValueType = number | undefined | null;
export declare function SliderField(props: {
    value: SliderFieldValueType;
    onValueChange: (_value: SliderFieldValueType) => void;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): React.JSX.Element;
