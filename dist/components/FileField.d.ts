/// <reference types="react" />
import { ImageURISource, ImageRequireSource, StyleProp, ViewStyle } from 'react-native';
export declare type ImageSourceType = ImageURISource | ImageRequireSource | null | {
    uri: string | null;
};
export default function FileField(props: {
    value: ImageSourceType;
    defaultValue?: ImageSourceType;
    mimeType: string;
    onValueChange: (_value: any) => void;
    label?: string;
    error?: any;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    aspect?: [number, number];
    quality?: number;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;