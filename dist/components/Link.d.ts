/// <reference types="react" />
export default function Link(props: {
    title: string;
    onPress: () => void;
    color?: string;
    disabled?: boolean;
    containerStyle?: any;
}): JSX.Element;
