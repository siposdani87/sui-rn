import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export declare function Label(props: {
    text?: string;
    onPress?: () => void;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
}): JSX.Element | null;
