/// <reference types="react" />
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
export declare function EmailField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: any[];
} & TextInputProps): JSX.Element;
