/// <reference types="react" />
export default function ColorField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    okText: string;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    defaultColor?: string;
    containerStyle?: any;
    style?: any;
}): JSX.Element;
