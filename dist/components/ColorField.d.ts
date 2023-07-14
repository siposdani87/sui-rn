import React from 'react';
import { ErrorValueType } from './ErrorField';
import { StyleProp, ViewStyle } from 'react-native';
export declare function ColorField(props: {
    value: string;
    onValueChange: (_value: string) => void;
    okText: string;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    defaultColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): React.JSX.Element;
