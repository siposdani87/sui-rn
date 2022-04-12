/// <reference types="react" />
import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export default function TextAreaField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    numberOfLines?: number;
    richText?: boolean;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<TextStyle>;
}): JSX.Element;
