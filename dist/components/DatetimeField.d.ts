/// <reference types="react" />
export default function DatetimeField(props: {
    mode: any;
    value: any;
    onValueChange: (_value: any) => void;
    okText: string;
    format: string;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    searchPlaceholder?: string;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
}): JSX.Element;
