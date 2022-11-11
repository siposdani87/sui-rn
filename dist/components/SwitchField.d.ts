/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export declare type SwitchFieldValueType = any;
export declare function SwitchField(props: {
    value: SwitchFieldValueType;
    onValueChange: (_value: SwitchFieldValueType) => void;
    trueValue?: SwitchFieldValueType;
    falseValue?: SwitchFieldValueType;
    label?: string;
    error?: string[] | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;
