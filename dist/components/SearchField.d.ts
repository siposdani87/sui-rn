/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export declare function SearchField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: JSX.Element[];
}): JSX.Element;
