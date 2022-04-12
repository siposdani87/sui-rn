import { useState } from 'react';

export default function useErrorField(
    error?: string | null,
): [string | null, () => void] {
    const [clearError, setClearError] = useState<string | null>(null);
    const [prevError, setPrevError] = useState<string | null>(null);

    const newError = clearError !== error ? error : null;
    if (prevError !== newError) {
        setPrevError(newError ?? null);
    }

    const onErrorChange = (): void => {
        if (prevError) {
            setClearError(prevError);
        }
        setPrevError(null);
    };

    return [prevError, onErrorChange];
}
