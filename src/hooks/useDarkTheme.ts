
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function useDarkTheme() {
    const colorScheme = useColorScheme();
    return environment.dark_theme === null ? colorScheme === 'dark' : environment.dark_theme;
}
