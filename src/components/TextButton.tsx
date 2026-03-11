import React from 'react';
import {
    ColorValue,
    StyleProp,
    StyleSheet,
    Text,
    Pressable,
    View,
    ViewStyle,
} from 'react-native';
import { Colors, Styles, Tokens } from '../constants';
import { useDarkTheme } from '../hooks';

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
    const backgroundColor = props.backgroundColor ?? 'transparent';
    const borderColor = props.borderColor ?? backgroundColor;
    const textColor = props.textColor ?? defaultColor;
    const textSize = props.textSize ?? Tokens.fontSizeBody;

    const getTitle = (): string => {
        return props.keepFormat ? props.title : props.title.toUpperCase();
    };

    const onPress = (): void => {
        if (!props.disabled && props.onPress) {
            props.onPress();
        }
    };

    return (
        <Pressable
            style={[styles.container, props.containerStyle]}
            onPress={onPress}
        >
            <View
                style={[
                    styles.button,
                    { backgroundColor, borderColor },
                    backgroundColor !== 'transparent'
                        ? Styles.lightShadow
                        : null,
                    props.style,
                ]}
            >
                <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    style={[
                        styles.text,
                        { color: textColor, fontSize: textSize },
                    ]}
                >
                    {getTitle()}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: Tokens.buttonMargin,
    },
    button: {
        borderRadius: Tokens.borderRadiusButton,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Tokens.buttonBorderWidth,
        padding: Tokens.buttonPadding,
    },
    text: {
        fontFamily: Styles.fontFamilyBodyMedium,
        fontWeight: Tokens.fontWeightMedium,
        fontSize: Tokens.fontSizeBody,
        flexShrink: 1,
        paddingHorizontal: Tokens.buttonPaddingHorizontal,
        paddingVertical: Tokens.buttonPaddingVertical,
    },
});
