import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { BaseFieldProps } from './BaseFieldProps';
export type RichTextAreaFieldValueType = string | null | undefined;
export declare function RichTextAreaField(props: Omit<BaseFieldProps, 'style'> & {
    value: RichTextAreaFieldValueType;
    onValueChange: (value: RichTextAreaFieldValueType) => void;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
}): React.JSX.Element;
//# sourceMappingURL=RichTextAreaField.d.ts.map