/// <reference types="react" />
export default function Label(props: {
    text?: string;
    onPress?: () => void;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    containerStyle?: any;
    style?: any;
    children?: any;
}): JSX.Element | null;
