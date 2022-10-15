import { useCallback } from 'react';
import { Colors } from '../constants';
import { useDarkTheme } from './useDarkTheme';

export function useActionColor(
    disabled?: boolean,
): (_selected?: boolean) => string {
    const isDarkTheme = useDarkTheme();

    const getActionColor = useCallback(
        (selected?: boolean): string => {
            if (disabled) {
                return isDarkTheme
                    ? Colors.contentDisabledDark
                    : Colors.contentDisabledLight;
            }
            if (selected) {
                return isDarkTheme ? Colors.accentBright : Colors.accent;
            }
            return isDarkTheme ? Colors.primaryBright : Colors.primary;
        },
        [disabled, isDarkTheme],
    );

    return getActionColor;
}
