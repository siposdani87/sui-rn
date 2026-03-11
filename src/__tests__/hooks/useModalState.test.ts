import { renderHook, act } from '@testing-library/react-native';
import { useModalState } from '../../hooks/useModalState';

describe('useModalState', () => {
    it('initial state is false by default', () => {
        const { result } = renderHook(() => useModalState());
        const [visible] = result.current;
        expect(visible).toBe(false);
    });

    it('initial state can be set to true', () => {
        const { result } = renderHook(() => useModalState(true));
        const [visible] = result.current;
        expect(visible).toBe(true);
    });

    it('open() sets visible to true', () => {
        const { result } = renderHook(() => useModalState());
        expect(result.current[0]).toBe(false);

        act(() => {
            result.current[1](); // open
        });

        expect(result.current[0]).toBe(true);
    });

    it('close() sets visible to false', () => {
        const { result } = renderHook(() => useModalState(true));
        expect(result.current[0]).toBe(true);

        act(() => {
            result.current[2](); // close
        });

        expect(result.current[0]).toBe(false);
    });

    it('toggle() toggles the state', () => {
        const { result } = renderHook(() => useModalState());
        expect(result.current[0]).toBe(false);

        act(() => {
            result.current[3](); // toggle
        });

        expect(result.current[0]).toBe(true);

        act(() => {
            result.current[3](); // toggle
        });

        expect(result.current[0]).toBe(false);
    });
});
