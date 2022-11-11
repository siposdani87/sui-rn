import { useEffect, useState } from 'react';

export function useErrorField(
    error: string[] | null = null,
): [string[] | null, () => void] {
    const [clearError, setClearError] = useState<string[] | null>(null);
    const [prevError, setPrevError] = useState<string[] | null>(null);

    const newError = clearError !== error ? error : null;

    const onErrorChange = (): void => {
        if (prevError) {
            setClearError(prevError);
        }
        setPrevError(null);
    };

    useEffect(() => {
        if (prevError !== newError) {
            setPrevError(newError);
        }
    }, [prevError, newError]);

    return [prevError, onErrorChange];
}
