/// <reference types="react" />
export default function TextAreaField(props: {
    value: any;
    onValueChange: (_value: any) => void;
    numberOfLines?: number;
    richText?: boolean;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
}): JSX.Element;
