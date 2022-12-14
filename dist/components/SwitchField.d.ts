/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';
export type SwitchFieldValueType = any;
export declare function SwitchField(props: {
    value: SwitchFieldValueType;
    onValueChange: (_value: SwitchFieldValueType) => void;
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
}): JSX.Element;
