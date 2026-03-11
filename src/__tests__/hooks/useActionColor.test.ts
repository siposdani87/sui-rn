import { renderHook } from '@testing-library/react-native';
import { useActionColor } from '../../hooks/useActionColor';
import Colors from '../../constants/Colors';
import Environment from '../../constants/Environment';
import * as RN from 'react-native';

describe('useActionColor', () => {
    beforeEach(() => {
        Environment.dark_theme = null;
        jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    });

    it('returns primary color when not disabled and not selected', () => {
        const { result } = renderHook(() => useActionColor(false));
        const getColor = result.current;
        expect(getColor()).toBe(Colors.primary);
    });

    it('returns accent color when selected', () => {
        const { result } = renderHook(() => useActionColor(false));
        const getColor = result.current;
        expect(getColor(true)).toBe(Colors.accent);
    });

    it('returns disabled color when disabled', () => {
        const { result } = renderHook(() => useActionColor(true));
        const getColor = result.current;
        expect(getColor()).toBe(Colors.contentDisabledLight);
    });
});
