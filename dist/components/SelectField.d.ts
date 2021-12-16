/// <reference types="react" />
export default function SelectField(props: {
    value: any;
    items: any;
    onValueChange: (_value: any) => void;
    okText: string;
    multiple?: boolean;
    onSearch?: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    placeholder?: string;
    labelKey?: string;
    valueKey?: string;
    searchPlaceholder?: string;
    containerStyle?: any;
    style?: any;
}): JSX.Element;
