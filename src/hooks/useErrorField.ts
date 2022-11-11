import { useEffect, useState } from 'react';
import { ErrorValueType } from '../components';

export function useErrorField(
    error: ErrorValueType = null,
): [ErrorValueType, () => void] {
    const [clearError, setClearError] = useState<ErrorValueType>(null);
    const [prevError, setPrevError] = useState<ErrorValueType>(null);

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
