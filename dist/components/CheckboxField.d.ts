/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export default function CheckboxField(props: {
    value: any;
    trueValue?: any;
    falseValue?: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: any;
}): JSX.Element;
