import { ReactNode } from 'react';
export declare function Dialog(props: {
    visible: boolean;
    type?: string;
    title?: string;
    buttons?: ReactNode[];
    onClose?: () => void;
    children?: ReactNode;
}): JSX.Element;
