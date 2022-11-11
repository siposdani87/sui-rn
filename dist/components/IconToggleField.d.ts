/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export declare type IconToggleFieldValueType = any;
export declare function IconToggleField(props: {
    value: IconToggleFieldValueType;
    checkedIcon: string;
    uncheckedIcon: string;
    trueValue?: IconToggleFieldValueType;
    falseValue?: IconToggleFieldValueType;
    onValueChange: (_value: IconToggleFieldValueType) => void;
    disableUncheck?: boolean;
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
