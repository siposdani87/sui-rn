import { useState } from 'react';

export default function useModalState(
    initialOpen?: boolean,
): [boolean, () => void, () => void, () => void] {
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
