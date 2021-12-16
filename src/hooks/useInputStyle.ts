import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants';
import useDarkTheme from './useDarkTheme';

export default function useInputStyle(
    value: any,
    error: any,
    required?: boolean,
    disabled?: boolean,
    focused?: boolean,
): StyleProp<ViewStyle> {
    const isDarkTheme = useDarkTheme();
    const hasError = error || (required && (!value || value?.length === 0));

    const getInputStyle = (): StyleProp<ViewStyle> => {
        if (hasError) {
            if (disabled) {
                return isDarkTheme
                    ? styles.hasErrorDisabledDark
                    : styles.hasErrorDisabledLight;
            }
            return isDarkTheme
                ? styles.hasErrorDefaultDark
                : styles.hasErrorDefaultLight;
        }
        if (disabled) {
            return isDarkTheme
                ? styles.disabledDarkTextInput
                : styles.disabledLightTextInput;
        }
        return isDarkTheme
            ? styles.defaultDarkTextInput
            : styles.defaultLightTextInput;
    };

    const getFocusStyle = (): StyleProp<ViewStyle> | null => {
        if (focused) {
            const bottomColor = hasError
                ? isDarkTheme
                    ? Colors.errorDefaultDark
                    : Colors.errorDefaultLight
                : isDarkTheme
                ? Colors.primaryBright
                : Colors.primary;

            return {
                borderBottomWidth: 3,
                borderBottomColor: bottomColor,
            };
        }
        return null;
    };

    return StyleSheet.flatten([getInputStyle(), getFocusStyle()]);
}

const styles = StyleSheet.create({
    defaultLightTextInput: {
        color: Colors.contentDefaultLight,
        borderColor: Colors.inputDefaultLight,
    },
    defaultDarkTextInput: {
        color: Colors.contentDefaultDark,
        borderColor: Colors.inputDefaultDark,
    },
    disabledLightTextInput: {
        color: Colors.contentDisabledLight,
        borderColor: Colors.inputDisabledLight,
        borderStyle: 'dotted',
    },
    disabledDarkTextInput: {
        color: Colors.contentDisabledDark,
        borderColor: Colors.inputDisabledDark,
        borderStyle: 'dotted',
    },
    hasErrorDefaultLight: {
        color: Colors.contentDefaultLight,
        borderColor: Colors.errorDefaultLight,
    },
    hasErrorDefaultDark: {
        color: Colors.contentDefaultDark,
        borderColor: Colors.errorDefaultDark,
    },
    hasErrorDisabledLight: {
        color: Colors.contentDisabledLight,
        borderColor: Colors.errorDisabledLight,
        borderStyle: 'dotted',
    },
    hasErrorDisabledDark: {
        color: Colors.contentDisabledDark,
        borderColor: Colors.errorDisabledDark,
        borderStyle: 'dotted',
    },
});
