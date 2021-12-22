/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export default function NumberField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    actionButtons?: any[];
}): JSX.Element;
