import { renderHook, act } from '@testing-library/react-native';
import { useErrorField } from '../../hooks/useErrorField';

describe('useErrorField', () => {
    it('returns null error when no error prop provided', () => {
        const { result } = renderHook(() => useErrorField());
        const [error] = result.current;
        expect(error).toBeNull();
    });

    it('returns the error when error prop is provided', () => {
        const errorValue = ['Field is required'];
        const { result } = renderHook(() => useErrorField(errorValue));
        const [error] = result.current;
        expect(error).toEqual(['Field is required']);
    });

    it('onErrorChange clears the error', () => {
        const errorValue = ['Field is required'];
        const { result } = renderHook(() => useErrorField(errorValue));

        expect(result.current[0]).toEqual(['Field is required']);

        act(() => {
            result.current[1](); // onErrorChange
        });

        expect(result.current[0]).toBeNull();
    });
});
