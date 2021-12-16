/// <reference types="react" />
export default function NumberField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
    actionButtons?: any[];
}): JSX.Element;
