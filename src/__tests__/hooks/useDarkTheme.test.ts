import { renderHook } from '@testing-library/react-native';
import { useDarkTheme } from '../../hooks/useDarkTheme';
import Environment from '../../constants/Environment';
import * as RN from 'react-native';

describe('useDarkTheme', () => {
    beforeEach(() => {
        Environment.dark_theme = null;
    });

    it('returns false when color scheme is light', () => {
        jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
        const { result } = renderHook(() => useDarkTheme());
        expect(result.current).toBe(false);
    });

    it('returns true when color scheme is dark', () => {
        jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
        const { result } = renderHook(() => useDarkTheme());
        expect(result.current).toBe(true);
    });

    it('uses Environment.dark_theme override when set', () => {
        jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
        Environment.dark_theme = true;
        const { result } = renderHook(() => useDarkTheme());
        expect(result.current).toBe(true);
    });
});
