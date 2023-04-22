import { useColorScheme } from 'react-native';
import { Environment } from '../constants';
export function useDarkTheme() {
    const colorScheme = useColorScheme();
    return Environment.dark_theme === null
        ? colorScheme === 'dark'
        : Environment.dark_theme ?? false;
}
//# sourceMappingURL=useDarkTheme.js.map