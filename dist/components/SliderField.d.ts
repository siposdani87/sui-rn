/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export default function SliderField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;
