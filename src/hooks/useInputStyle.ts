import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ErrorValueType } from '../components';
import { Colors } from '../constants';
import { useDarkTheme } from './useDarkTheme';

export function useInputStyle<T>(
    value: T,
    error: ErrorValueType,
    required?: boolean,
    disabled?: boolean,
    focused?: boolean,
): StyleProp<ViewStyle> {
    const isDarkTheme = useDarkTheme();
    const hasError =
        error || (required && (!value || (value as Array<any>)?.length === 0));

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
            const errorColor = isDarkTheme
                ? Colors.errorDefaultDark
                : Colors.errorDefaultLight;
            const primaryColor = isDarkTheme
                ? Colors.primaryBright
                : Colors.primary;
            const bottomColor = hasError ? errorColor : primaryColor;

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
