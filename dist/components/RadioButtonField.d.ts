/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export declare function RadioButtonField(props: {
    value: any;
    trueValue?: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: JSX.Element | JSX.Element[];
}): JSX.Element;
