/// <reference types="react" />
export default function TextButton(props: {
    onPress: () => void;
    textColor?: string;
    textSize?: number;
    backgroundColor?: string;
    borderColor?: string;
    title: string;
    keepFormat?: boolean;
    disabled?: boolean;
    containerStyle?: any;
    style?: any;
}): JSX.Element;
