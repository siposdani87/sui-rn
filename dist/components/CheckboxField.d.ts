/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { IconToggleFieldValueType } from './IconToggleField';
export declare type CheckboxFieldValueType = IconToggleFieldValueType;
export declare function CheckboxField(props: {
    value: CheckboxFieldValueType;
    trueValue?: CheckboxFieldValueType;
    falseValue?: CheckboxFieldValueType;
    onValueChange: (_value: CheckboxFieldValueType) => void;
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
