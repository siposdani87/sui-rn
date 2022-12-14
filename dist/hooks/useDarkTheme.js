import { Appearance } from 'react-native';
import environment from '../config/environment';
export function useDarkTheme() {
    const colorScheme = Appearance.getColorScheme();
    return environment.dark_theme === null
        ? colorScheme === 'dark'
        : environment.dark_theme ?? false;
}
//# sourceMappingURL=useDarkTheme.js.map