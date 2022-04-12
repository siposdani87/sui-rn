import { useState } from 'react';

export function useModalState(
    initialOpen?: boolean,
): [visible: boolean, open: () => void, clos: () => void, toggle: () => void] {
    const [visible, setVisible] = useState<boolean>(initialOpen ?? false);

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
