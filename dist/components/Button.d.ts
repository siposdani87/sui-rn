/// <reference types="react" />
export default function Button(props: {
    onPress: () => void;
    iconColor?: string;
    textColor?: string;
    textSize?: number;
    backgroundColor?: string;
    borderColor?: string;
    title?: string;
    imageSource?: any;
    iconName?: any;
    iconSize?: number;
    iconType?: string;
    keepFormat?: boolean;
    layout?: string;
    disabled?: boolean;
    containerStyle?: any;
    style?: any;
}): JSX.Element;
