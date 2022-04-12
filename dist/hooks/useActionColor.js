import { Colors } from '../constants';
import { useDarkTheme } from './useDarkTheme';
export function useActionColor(disabled) {
    const isDarkTheme = useDarkTheme();
    const getActionColor = (selected) => {
        if (disabled) {
            return isDarkTheme
                ? Colors.contentDisabledDark
                : Colors.contentDisabledLight;
        }
        if (selected) {
            return isDarkTheme ? Colors.accentBright : Colors.accent;
        }
        return isDarkTheme ? Colors.primaryBright : Colors.primary;
    };
    return getActionColor;
}
//# sourceMappingURL=useActionColor.js.map