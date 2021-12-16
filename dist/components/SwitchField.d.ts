/// <reference types="react" />
export default function SwitchField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    trueValue?: any;
    falseValue?: any;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
}): JSX.Element;
