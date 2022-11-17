/// <reference types="react" />
import { ImageURISource, ImageRequireSource, StyleProp, ViewStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';
export declare type FileSourceType = ImageURISource | ImageRequireSource | null | {
    uri: string | null;
};
export declare function FileField(props: {
    value: FileSourceType;
    defaultValue?: FileSourceType;
    mimeType: string;
    onValueChange: (_value: string | null) => void;
    label?: string;
    error?: ErrorValueType;
    required?: boolean;
    disabled?: boolean;
    desc?: string;
    onPressDesc?: () => void;
    aspect?: [number, number];
    quality?: number;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
}): JSX.Element;
