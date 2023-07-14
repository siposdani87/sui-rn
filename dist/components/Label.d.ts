import React, { ReactNode } from 'react';
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
}): React.JSX.Element | null;
