/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export declare function ColorField(props: {
    value: string;
    onValueChange: (_value: string) => void;
    okText: string;
    label?: string;
    error?: string[] | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    defaultColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;
