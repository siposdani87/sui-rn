/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export default function RadioButtonField(props: {
    value: any;
    trueValue?: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: any;
}): JSX.Element;