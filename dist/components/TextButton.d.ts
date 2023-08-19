import React from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';
export declare function TextButton(props: {
    onPress: () => void;
    textColor?: ColorValue;
    textSize?: number;
    backgroundColor?: ColorValue;
    borderColor?: ColorValue;
    title: string;
    keepFormat?: boolean;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): React.JSX.Element;
