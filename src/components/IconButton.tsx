import React from 'react';
import {
    ColorValue,
    StyleProp,
    ViewStyle,
    ImageSourcePropType,
} from 'react-native';
import { Colors } from '../constants';
import { useDarkTheme } from '../hooks';
import { Button } from './Button';

export function IconButton(props: {
    onPress: () => void;
    iconColor?: ColorValue;
    backgroundColor?: ColorValue;
    borderColor?: ColorValue;
    imageSource?: ImageSourcePropType;
    iconName?: string;
    iconType?: string;
    iconSize?: number;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}) {
    const isDarkTheme = useDarkTheme();
    const defaultColor = isDarkTheme ? Colors.white : Colors.black;

    return (
        <Button
            onPress={props.onPress}
            iconColor={props.iconColor ?? defaultColor}
            backgroundColor={props.backgroundColor ?? 'transparent'}
            borderColor={
                props.borderColor ?? props.backgroundColor ?? 'transparent'
            }
            imageSource={props.imageSource}
            iconName={props.iconName}
            iconType={props.iconType}
            iconSize={props.iconSize}
            disabled={props.disabled}
            containerStyle={props.containerStyle}
            style={props.style}
        />
    );
}
