import { useColorScheme } from 'react-native';
import { Environment } from '../constants';

export function useDarkTheme(): boolean {
    const colorScheme = useColorScheme();

    return Environment.dark_theme === null
        ? colorScheme === 'dark'
        : Environment.dark_theme ?? false;
}
