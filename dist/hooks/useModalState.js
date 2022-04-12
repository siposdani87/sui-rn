import { useState } from 'react';
export function useModalState(initialOpen) {
    const [visible, setVisible] = useState(initialOpen ?? false);
    const open = () => {
        setVisible(true);
    };
    const close = () => {
        setVisible(false);
    };
    const toggle = () => {
        setVisible(!visible);
    };
    return [visible, open, close, toggle];
}
//# sourceMappingURL=useModalState.js.map