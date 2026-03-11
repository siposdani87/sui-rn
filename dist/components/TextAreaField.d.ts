import React from 'react';
import { TextFieldValueType } from './TextField';
import { StyleProp, TextStyle } from 'react-native';
import { BaseFieldProps } from './BaseFieldProps';
export type TextAreaFieldValueType = TextFieldValueType;
export declare function TextAreaField(props: Omit<BaseFieldProps, 'style'> & {
    value: TextAreaFieldValueType;
    onValueChange: (value: TextAreaFieldValueType) => void;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
}): React.JSX.Element;
//# sourceMappingURL=TextAreaField.d.ts.map