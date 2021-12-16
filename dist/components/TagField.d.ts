/// <reference types="react" />
export default function TagField(props: {
    values: any[];
    onValuesChange: (_value: any[]) => void;
    onPress?: (_index: number) => void;
    readonly?: boolean;
    label?: string;
    error?: any;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
    actionButtons?: any[];
}): JSX.Element;
