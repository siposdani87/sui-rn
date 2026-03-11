import React from 'react';
import { ImageURISource, ImageRequireSource } from 'react-native';
import { BaseFieldProps } from './BaseFieldProps';
export type FileSourceType = ImageURISource | ImageRequireSource | null | {
    uri: string | null;
};
export declare function FileField(props: BaseFieldProps & {
    value: FileSourceType;
    defaultValue?: FileSourceType;
    mimeType: string;
    onValueChange: (value: string | null) => void;
    aspect?: [number, number];
    quality?: number;
}): React.JSX.Element;
//# sourceMappingURL=FileField.d.ts.map