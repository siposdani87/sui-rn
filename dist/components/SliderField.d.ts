/// <reference types="react" />
export default function SliderField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    minimumValue?: number;
    maximumValue?: number;
    step?: number;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
}): JSX.Element;
