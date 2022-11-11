/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { IconToggleFieldValueType } from './IconToggleField';
export declare type RadioButtonFieldField = IconToggleFieldValueType;
export declare function RadioButtonField(props: {
    value: RadioButtonFieldField;
    trueValue?: RadioButtonFieldField;
    falseValue?: RadioButtonFieldField;
    onValueChange: (_value: RadioButtonFieldField) => void;
    label?: string;
    error?: string[] | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: JSX.Element | JSX.Element[];
}): JSX.Element;
