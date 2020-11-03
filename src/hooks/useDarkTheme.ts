
import { useColorScheme } from 'react-native-appearance';
import environment from '../config/environment';

export default function useDarkTheme() {
    return environment.dark_theme === null ? useColorScheme() === 'dark' : environment.dark_theme;
}
