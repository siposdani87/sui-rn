import React, { ReactNode } from 'react';
import { TextInputProps, StyleProp, TextStyle } from 'react-native';
import { BaseFieldProps } from './BaseFieldProps';
export type TextFieldValueType = string | null | undefined;
export declare function TextField(props: Omit<BaseFieldProps, 'style'> & {
    value: TextFieldValueType;
    onValueChange: (value: TextFieldValueType) => void;
    readonly?: boolean;
    placeholder?: string;
    style?: StyleProp<TextStyle>;
    actionButtons?: ReactNode[];
} & Omit<TextInputProps, 'value' | 'onChangeText'>): React.JSX.Element;
//# sourceMappingURL=TextField.d.ts.map