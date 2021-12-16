/// <reference types="react" />
export default function CheckboxField(props: {
    value: any;
    trueValue?: any;
    falseValue?: any;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
    children?: any;
}): JSX.Element;
