/// <reference types="react" />
export declare function Dialog(props: {
    visible: boolean;
    type?: string;
    title?: string;
    buttons?: JSX.Element[];
    onClose?: () => void;
    children?: JSX.Element | JSX.Element[];
}): JSX.Element;
