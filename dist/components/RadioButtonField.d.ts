/// <reference types="react" />
export default function RadioButtonField(props: {
    value: any;
    trueValue?: any;
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
