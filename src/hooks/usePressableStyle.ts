import { useMemo } from 'react';
import {
    Platform,
    PressableAndroidRippleConfig,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { Colors } from '../constants';
import { useDarkTheme } from './useDarkTheme';

interface PressableStyleResult {
    style: (state: { pressed: boolean }) => StyleProp<ViewStyle>;
    android_ripple: PressableAndroidRippleConfig | null;
}

export function usePressableStyle(
    baseStyle?: StyleProp<ViewStyle>,
    pressedOpacity?: number,
): PressableStyleResult {
    const isDarkTheme = useDarkTheme();

    return useMemo(() => {
        const opacity = pressedOpacity ?? 0.6;
        const rippleColor = isDarkTheme ? Colors.primaryBright : Colors.primary;

        return {
            style: ({
                pressed,
            }: {
                pressed: boolean;
            }): StyleProp<ViewStyle> => [
                baseStyle,
                Platform.OS === 'ios' && pressed ? { opacity } : null,
            ],
            android_ripple:
                Platform.OS === 'android'
                    ? { color: rippleColor, borderless: false }
                    : null,
        };
    }, [baseStyle, pressedOpacity, isDarkTheme]);
}
