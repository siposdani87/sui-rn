/// <reference types="react" />
import { TextInputProps } from 'react-native';
export default function TextField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    readonly?: boolean;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
    actionButtons?: any[];
} & TextInputProps): JSX.Element;
