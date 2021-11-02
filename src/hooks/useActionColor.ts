import { Colors } from '../constants';
import useDarkTheme from './useDarkTheme';

export default function useActionColor(disabled: boolean) {
    const isDarkTheme = useDarkTheme();

    function getActionColor(selected?: boolean) {
        if (disabled) {
            return isDarkTheme
                ? Colors.contentDisabledDark
                : Colors.contentDisabledLight;
        }
        if (selected) {
            return isDarkTheme ? Colors.accentBright : Colors.accent;
        }
        return isDarkTheme ? Colors.primaryBright : Colors.primary;
    }

    return getActionColor;
}
