import React from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../constants';
import { useDarkTheme } from '../hooks';
import { Button } from './Button';

export function TextButton(props: {
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
}) {
    const isDarkTheme = useDarkTheme();
    const defaultColor = isDarkTheme ? Colors.white : Colors.black;

    return (
        <Button
            onPress={props.onPress}
            textColor={props.textColor ?? defaultColor}
            textSize={props.textSize}
            backgroundColor={props.backgroundColor ?? 'transparent'}
            borderColor={
                props.borderColor ?? props.backgroundColor ?? 'transparent'
            }
            title={props.title}
            keepFormat={props.keepFormat}
            disabled={props.disabled}
            containerStyle={props.containerStyle}
            style={props.style}
        />
    );
}
