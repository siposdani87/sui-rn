/// <reference types="react" />
export default function Dialog(props: {
    visible: boolean;
    type?: string;
    title?: string;
    buttons?: any[];
    onClose?: () => void;
    children?: any;
}): JSX.Element;
