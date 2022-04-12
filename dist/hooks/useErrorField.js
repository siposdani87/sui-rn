import { useState } from 'react';
export function useErrorField(error) {
    const [clearError, setClearError] = useState(null);
    const [prevError, setPrevError] = useState(null);
    const newError = clearError !== error ? error : null;
    if (prevError !== newError) {
        setPrevError(newError);
    }
    const onErrorChange = () => {
        if (prevError) {
            setClearError(prevError);
        }
        setPrevError(null);
    };
    return [prevError, onErrorChange];
}
//# sourceMappingURL=useErrorField.js.map