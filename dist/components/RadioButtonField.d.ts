/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { IconToggleFieldValueType } from './IconToggleField';
import { ErrorValueType } from './ErrorField';
export type RadioButtonFieldField = IconToggleFieldValueType;
export declare function RadioButtonField(props: {
    value: RadioButtonFieldField;
    trueValue?: RadioButtonFieldField;
    falseValue?: RadioButtonFieldField;
    onValueChange: (_value: RadioButtonFieldField) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: JSX.Element | JSX.Element[];
}): JSX.Element;
