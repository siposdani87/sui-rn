import { useState } from 'react';

export default function useErrorField(error?: any) {
    const [clearError, setClearError] = useState(null);
    const [prevError, setPrevError] = useState(null);

    const newError = clearError !== error ? error : null;
    if (prevError !== newError) {
        setPrevError(newError);
    }

    function onErrorChange(): void {
        if (prevError) {
            setClearError(prevError);
        }
        setPrevError(null);
    }

    return [prevError, onErrorChange];
}
