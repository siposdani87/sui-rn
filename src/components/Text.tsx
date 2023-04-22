import React from 'react';
import {
    Text as RNText,
    StyleSheet,
    TextProps,
    StyleProp,
    TextStyle,
} from 'react-native';
import { Colors, Styles } from '../constants';
import { useDarkTheme } from '../hooks';

export function Text(
    props: { children?: React.ReactNode; muted?: boolean } & TextProps,
) {
    const isDarkTheme = useDarkTheme();

    const getTextStyle = (): StyleProp<TextStyle> => {
        if (props.muted) {
            return styles.mutedText;
        }
        return isDarkTheme ? styles.darkText : styles.lightText;
    };

    return (
        <RNText {...props} style={[styles.text, getTextStyle(), props.style]}>
            {props.children}
        </RNText>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: Styles.fontFamilyBodyRegular,
        fontWeight: '400',
        fontSize: 16,
    },
    lightText: {
        color: Colors.black,
    },
    darkText: {
        color: Colors.white,
    },
    mutedText: {
        color: Colors.deepGreyBright,
    },
});
