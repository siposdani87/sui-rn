import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Colors, Styles } from '../constants';
import { useDarkTheme } from '../hooks/useDarkTheme';

export function Link(props: {
    title: string;
    onPress: () => void;
    color?: string;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
}): JSX.Element {
    const isDarkTheme = useDarkTheme();
    const defaultColor = isDarkTheme ? Colors.primaryBright : Colors.primary;
    const color = props.color || defaultColor;
    const colorStyle = { color, textDecorationColor: color };

    const onPress = (): void => {
        if (!props.disabled && props.onPress) {
            props.onPress();
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={Styles.activeOpacity}
            onPress={onPress}
            style={props.containerStyle}
        >
            <Text style={[styles.text, colorStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    },
});
