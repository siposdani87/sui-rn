/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export default function ColorField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    okText: string;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    defaultColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;
