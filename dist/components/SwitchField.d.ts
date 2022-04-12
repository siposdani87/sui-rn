/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export default function SwitchField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    trueValue?: any;
    falseValue?: any;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;
