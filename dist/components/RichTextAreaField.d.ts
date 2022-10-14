/// <reference types="react" />
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export declare function RichTextAreaField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    numberOfLines?: number;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
}): JSX.Element;
