import React from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';
export declare function Link(props: {
    title: string;
    onPress: () => void;
    color?: ColorValue;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
}): React.JSX.Element;
