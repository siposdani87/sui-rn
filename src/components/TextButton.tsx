import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Styles } from '../constants';
import useDarkTheme from '../hooks/useDarkTheme';

export default function TextButton(props: {
    onPress: () => void;
    textColor?: string;
    textSize?: number;
    backgroundColor?: string;
    borderColor?: string;
    title: string;
    keepFormat?: boolean;
    disabled?: boolean;
    containerStyle?: any;
    style?: any;
}): JSX.Element {
    const isDarkTheme = useDarkTheme();
    const defaultColor = isDarkTheme ? Colors.white : Colors.black;
    const backgroundColor = props.backgroundColor || 'transparent';
    const borderColor = props.borderColor || backgroundColor;
    const textColor = props.textColor || defaultColor;
    const textSize = props.textSize || 16;

    const getTitle = (): string => {
        return props.keepFormat ? props.title : props.title.toUpperCase();
    };

    const onPress = (): void => {
        if (!props.disabled && props.onPress) {
            props.onPress();
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, props.containerStyle]}
            activeOpacity={Styles.activeOpacity}
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
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    button: {
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
    },
    text: {
        fontFamily: Styles.fontFamilyBodyMedium,
        fontWeight: '500',
        fontSize: 16,
        flexShrink: 1,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
});
