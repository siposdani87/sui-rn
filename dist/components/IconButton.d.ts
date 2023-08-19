import React from 'react';
import { StyleProp, ViewStyle, ImageSourcePropType, ColorValue } from 'react-native';
export declare function IconButton(props: {
    onPress: () => void;
    iconColor?: ColorValue;
    backgroundColor?: ColorValue;
    borderColor?: ColorValue;
    imageSource?: ImageSourcePropType;
    iconName?: any;
    iconType?: string;
    iconSize?: number;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): React.JSX.Element;
