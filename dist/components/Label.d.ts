/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export default function Label(props: {
    text?: string;
    onPress?: () => void;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: any;
}): JSX.Element | null;
