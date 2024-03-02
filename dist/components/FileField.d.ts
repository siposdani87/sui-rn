import React from 'react';
import { ImageURISource, ImageRequireSource, StyleProp, ViewStyle } from 'react-native';
import { ErrorValueType } from './ErrorField';
export type FileSourceType = ImageURISource | ImageRequireSource | null | {
    uri: string | null;
};
export declare function FileField(props: {
    value: FileSourceType;
    defaultValue?: FileSourceType;
    mimeType: string;
    onValueChange: (value: string | null) => void;
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
}): React.JSX.Element;
