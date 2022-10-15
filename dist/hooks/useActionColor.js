import { useCallback } from 'react';
import { Colors } from '../constants';
import { useDarkTheme } from './useDarkTheme';
export function useActionColor(disabled) {
    const isDarkTheme = useDarkTheme();
    const getActionColor = useCallback((selected) => {
        if (disabled) {
            return isDarkTheme
                ? Colors.contentDisabledDark
                : Colors.contentDisabledLight;
        }
        if (selected) {
            return isDarkTheme ? Colors.accentBright : Colors.accent;
        }
        return isDarkTheme ? Colors.primaryBright : Colors.primary;
    }, [disabled, isDarkTheme]);
    return getActionColor;
}
//# sourceMappingURL=useActionColor.js.map