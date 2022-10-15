/// <reference types="react" />
import { ImageURISource, ImageRequireSource, StyleProp, ViewStyle } from 'react-native';
export declare type ImageSourceType = ImageURISource | ImageRequireSource | null | {
    uri: string | null;
};
export declare function FileField(props: {
    value: ImageSourceType;
    defaultValue?: ImageSourceType;
    mimeType: string;
    onValueChange: (_value: string | null) => void;
    label?: string;
    error?: string | null;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    aspect?: [number, number];
    quality?: number;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;
