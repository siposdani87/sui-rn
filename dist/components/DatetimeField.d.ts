/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export default function DatetimeField(props: {
    mode: any;
    value: any;
    onValueChange: (_value: any) => void;
    okText: string;
    format: string;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    searchPlaceholder?: string;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;
