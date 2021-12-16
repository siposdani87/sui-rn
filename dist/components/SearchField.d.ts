/// <reference types="react" />
export default function SearchField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    placeholder?: string;
    containerStyle?: any;
    style?: any;
    actionButtons?: JSX.Element[];
}): JSX.Element;
