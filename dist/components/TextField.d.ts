/// <reference types="react" />
import { TextInputProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
export declare function TextField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    readonly?: boolean;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
    actionButtons?: JSX.Element[];
} & TextInputProps): JSX.Element;
