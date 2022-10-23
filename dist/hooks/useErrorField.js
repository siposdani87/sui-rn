import { useEffect, useState } from 'react';
export function useErrorField(error = null) {
    const [clearError, setClearError] = useState(null);
    const [prevError, setPrevError] = useState(null);
    const newError = clearError !== error ? error : null;
    const onErrorChange = () => {
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
//# sourceMappingURL=useErrorField.js.map