/// <reference types="react" />
import { TextInputProps } from 'react-native';
export default function PasswordField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
    actionButtons?: any[];
} & TextInputProps): JSX.Element;
