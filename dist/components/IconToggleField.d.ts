/// <reference types="react" />
export default function IconToggleField(props: {
    value: any;
    checkedIcon: string;
    uncheckedIcon: string;
    trueValue?: any;
    falseValue?: any;
    onValueChange: (_value: any) => void;
    disableUncheck?: boolean;
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
