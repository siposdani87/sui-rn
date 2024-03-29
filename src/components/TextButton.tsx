import React from 'react';
import {
    ColorValue,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Colors, Styles } from '../constants';
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
    const textSize = props.textSize ?? 16;

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
